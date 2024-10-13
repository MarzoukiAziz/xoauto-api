const AmazonCognitoId = require("amazon-cognito-identity-js");
const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
// Importing the Cognito client from AWS SDK v3
const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

// Set user pool credentials.
const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID,
};
const aws_region = process.env.AWS_REGION;
const userPool = new AmazonCognitoId.CognitoUserPool(poolData);

// Login
const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate request format
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Bad format: Email and password are required" });
  }

  try {
    const authenticationDetails = new AmazonCognitoId.AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoId.CognitoUser(userData);

    // Authenticate the user
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async (result) => {
        try {
          // Check if the user exists in database
          const user = await User.findOne({ email });
          if (!user) {
            return next(new ErrorResponse(userNotFoundMessage, 404));
          }
          // Update the last login date
          user.lastLogin = Date.now();
          await user.save();
          // Send user info and tokens as a response
          return res.status(200).json({
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
            user,
          });
        } catch (dbError) {
          return next(dbError);
        }
      },
      onFailure: (err) => {
        return res.status(401).json({ error: err.message });
      },
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Verify token.
const verifyToken = async (req, res, next) => {
  try {
    if (req.query.accessToken) {
      let { accessToken } = req.query;

      // Download JWKT from AWS and verify the token
      downloadJwk(accessToken)
        .then((body) => {
          let pems = {};
          let keys = body["keys"];

          for (let i = 0; i < keys.length; i++) {
            // Convert each key to PEM
            let key_id = keys[i].kid;
            let modulus = keys[i].n;
            let exponent = keys[i].e;
            let key_type = keys[i].kty;
            let jwk = { kty: key_type, n: modulus, e: exponent };
            let pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }

          // Validate the token
          let decodedJwt = jwt.decode(accessToken, { complete: true });

          // If not a valid JWT
          if (!decodedJwt) {
            return res.status(400).json({ error: "Not a valid JWT token" });
          }

          let kid = decodedJwt.header.kid;
          let pem = pems[kid];

          if (!pem) {
            return res.status(400).json({ error: "Invalid token" });
          }

          jwt.verify(accessToken, pem, async (err, payload) => {
            if (err) {
              return res.status(400).json({ error: "Invalid token" });
            } else {
              const id = payload.sub;
              const user = await User.findOne({ id });

              // Return user and token payload if successful
              return res.status(200).json({ result: payload, user });
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      res.status(400).json({ error: "bad format" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// Download JWKS.
const downloadJwk = (token) => {
  const urlJwk = `https://cognito-idp.${aws_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`;
  return new Promise((resolve, reject) => {
    request({ url: urlJwk, json: true }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

// Verify the registration code.
const verifyregistrationCode = async (req, res, next) => {
  const { body } = req;

  if (body.user && body.code) {
    const { user, code } = body;

    try {
      // Create user pool and user data
      const userPool = new AmazonCognitoId.CognitoUserPool(poolData);
      const userData = {
        Username: user,
        Pool: userPool,
      };
      const cognitoUser = new AmazonCognitoId.CognitoUser(userData);

      // Call cognito confirmRegistration directly
      cognitoUser.confirmRegistration(code, true, (error, result) => {
        if (error) {
          res.status(400).json({ success: false, message: "Code incorrect" });
        } else {
          res.status(200).json({ success: true, message: "Code correct" });
        }
      });
    } catch (error) {
      res.status(400).json({ success: false, message: "Code incorrect" });
    }
  } else {
    res.status(400).json({ error: "bad format" });
  }
};

// Register a new user, and return the data in a promise.
const signUp = async (req, res, next) => {
  let { email, username, phone, password } = req.body;
  try {
    const attributeList = [];
    attributeList.push(
      new AmazonCognitoId.CognitoUserAttribute({
        Name: "name",
        Value: username,
      })
    );
    attributeList.push(
      new AmazonCognitoId.CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    attributeList.push(
      new AmazonCognitoId.CognitoUserAttribute({
        Name: "phone_number",
        Value: phone,
      })
    );

    userPool.signUp(email, password, attributeList, null, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ error: err });
      } else {
        // Create a new user in the database
        const newUser = new User({
          id: data.userSub,
          name: username,
          email,
        });

        // Save the new user to the database
        await newUser.save();

        // Add the new user to the Cognito group using v3 client
        const client = new CognitoIdentityProviderClient({
          region: aws_region,
        });
        const params = {
          GroupName: "USER",
          UserPoolId: userPool.userPoolId,
          Username: email,
        };

        const command = new AdminAddUserToGroupCommand(params);
        try {
          await client.send(command);
          const response = {
            success: true,
          };
          res.status(200).json({ result: response });
        } catch (err) {
          console.log("Error adding user to group:", err);
          return res.status(400).json({ error: err });
        }
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const signUpStep2 = async (req, res, next) => {
  let { email, username, avatar, cid } = req.body;
  try {
    // Create a new user in the database
    const newUser = new User({
      id: cid,
      name: username,
      email,
      avatar,
    });

    await newUser.save();

    // Add the new user to the Cognito group using v3 client
    const client = new CognitoIdentityProviderClient({ region: aws_region });
    const params = {
      GroupName: "USER",
      UserPoolId: userPool.userPoolId,
      Username: email,
    };

    const command = new AdminAddUserToGroupCommand(params);
    await client.send(command);

    return res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// Disable or Enable user based on the action
const changeUserAccess = async (req, res, next) => {
  const { username, action } = req.body;
  const client = new CognitoIdentityProviderClient({ region: aws_region });

  // Prepare parameters for enabling/disabling user
  const params = {
    UserPoolId: poolData.UserPoolId,
    Username: username,
  };

  try {
    if (action === "disable") {
      const command = new AdminDisableUserCommand(params);
      await client.send(command);
      return res
        .status(200)
        .json({ message: `User ${username} disabled successfully` });
    } else if (action === "enable") {
      const command = new AdminEnableUserCommand(params);
      await client.send(command);
      return res
        .status(200)
        .json({ message: `User ${username} enabled successfully` });
    } else {
      return res
        .status(400)
        .json({ error: "Invalid action. Use 'enable' or 'disable'." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: `Error changing user access: ${error.message}` });
  }
};

module.exports = {
  verifyregistrationCode,
  signUp,
  logIn,
  verifyToken,
  signUpStep2,
  changeUserAccess,
};
