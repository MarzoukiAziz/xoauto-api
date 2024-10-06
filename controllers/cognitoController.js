const AmazonCognitoId = require("amazon-cognito-identity-js");
const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ROLES_LIST = require("../utils/rolesList");
const AWS = require("aws-sdk");

//Set user pool credentials.
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

//Verify token.
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

//Download jwsk.
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

//Very the registration code.
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

//Register a new user, and return the data in a promise.
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

        // Add the new user to the Cognito group
        const cognito = new AWS.CognitoIdentityServiceProvider();
        const params = {
          GroupName: "USER",
          UserPoolId: userPool.userPoolId,
          Username: email,
        };

        cognito.adminAddUserToGroup(params, (err, data) => {
          if (err) {
            console.log("Error adding user to group:", err);
            return res.status(400).json({ error: err });
          }

          const response = {
            success: true,
          };
          res.status(200).json({ result: response });
        });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const changeUserAccess = async (req, res, next) => {
  try {
    let { username, action } = req.body;
    const params = {
      UserPoolId: poolData.UserPoolId,
      Username: username,
    };
    const cognito = new AWS.CognitoIdentityServiceProvider();
    if (action == "disable") {
      cognito.adminDisableUser(params, (err, data) => {
        if (err) {
          return res
            .status(404)
            .json({ message: "Error disabling user: " + err });
        } else {
          res.status(200).json("User disabled successfully");
        }
      });
    } else {
      cognito.adminEnableUser(params, (err, data) => {
        if (err) {
          return res
            .status(404)
            .json({ message: "Error enabling user: " + err });
        } else {
          res.status(200).json("User enabled successfully");
        }
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  verifyregistrationCode,
  signUp,
  logIn,
  verifyToken,
  changeUserAccess,
};
