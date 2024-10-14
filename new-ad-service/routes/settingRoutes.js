const express = require("express");
const {
  getNewSettings,
  getNewSettingsWithBrands,
  updateNewSettings,
} = require("../controllers/settingsController");
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");

const router = express.Router();

router.get("/new", getNewSettings);
router.get("/new-details", getNewSettingsWithBrands);
router.put(
  "/new",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  updateNewSettings
);

module.exports = router;
