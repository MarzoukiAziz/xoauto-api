const express = require("express");
const router = express.Router();

const cognitoRoutes = require("./cognitoRoutes");
const userRoutes = require("./userRoutes");
const cloudinaryRoute = require("./cloudinaryRoutes");
const insightsRoutes = require("./insightsRoutes");

router.use("/v1/cognito", cognitoRoutes);
router.use("/v1/user", userRoutes);
router.use("/v1/insights", insightsRoutes);
router.use("/v1/cloudinary", cloudinaryRoute);

module.exports = router;
