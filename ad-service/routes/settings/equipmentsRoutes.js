const express = require("express");
const {
  getEquipment,
  updateEquipment,
} = require("../../controllers/settings/equipmentController");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const verifyUserRoles = require("../../middlewares/verifyUserRoles");
const ROLES_LIST = require("../../utils/rolesList");
const router = express.Router();

// Get the single Equipment item
router.get("/", getEquipment);

// Update the single Equipment item
router.put(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  updateEquipment
);

module.exports = router;
