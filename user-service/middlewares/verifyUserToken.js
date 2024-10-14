const CognitoExpress = require("cognito-express");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
const ErrorResponse = require("../utils/errorResponse");

const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_REGION,
  cognitoUserPoolId: process.env.AWS_USER_POOL_ID,
  tokenUse: "access",
  tokenExpiration: 3600000,
});

const verifyUserToken = (req, res, next) => {
  let token;

  // Check if the request originates from a whitelisted origin
  if (req.originSource === "Whitelisted Origin") {
    // Get the token from the Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith("Bearer")) {
      // If the token is missing or doesn't start with "Bearer", send an unauthorized response
      return next(new ErrorResponse("Unauthorized access", 401));
    }
    // Extract the token from the Authorization header
    token = authHeader.split(" ")[1];
  } else {
    return res.status(401).send({});
  }

  cognitoExpress.validate(token, function (err, response) {
    if (err) {
      return res.status(401).send(err);
    } else {
      const decoded = jwt.decode(token, { complete: true });
      req.userId = decoded.payload.sub;
      req.user = decoded.payload;
      req.roles = decoded.payload["cognito:groups"] || [];
      next();
    }
  });
};

module.exports = verifyUserToken;
