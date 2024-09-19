const express = require("express");
const router = express.Router();

//User Route
const userRoutes = require("./userRoutes");
const articleRoutes = require("./articleRoutes");
const commentRoutes = require("./commentRoutes");
const adRoutes = require("./adRoutes");
const adViewRoutes = require("./adViewRoutes");
const inshightsRoutes = require("./inshightsRoutes");

router.use("/v1/user", userRoutes);
router.use("/v1/article", articleRoutes);
router.use("/v1/comment", commentRoutes);
router.use("/v1/ads", adRoutes);
router.use("/v1/ad-views", adViewRoutes);
router.use("/v1/inshights", inshightsRoutes);

module.exports = router;
