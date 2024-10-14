const express = require("express");
const {
  getEnergies,
  createEnergy,
  deleteEnergy,
} = require("../../controllers/settings/energyController");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const verifyUserRoles = require("../../middlewares/verifyUserRoles");
const ROLES_LIST = require("../../utils/rolesList");

const router = express.Router();

router.get("/", getEnergies);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  createEnergy
);

router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteEnergy
);

module.exports = router;
