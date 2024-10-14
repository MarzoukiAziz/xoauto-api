const express = require("express");
const router = express.Router();

const newAdRoutes = require("./newAdRoutes.js");
const SettingRoutes = require("./settingRoutes");
const newAdCommentRoutes = require("./newAdCommentsRoutes.js");

router.use("/v1/new-ads", newAdRoutes);
router.use("/v1/new-ad-comments", newAdCommentRoutes);
router.use("/v1/settings/", SettingRoutes);

module.exports = router;
