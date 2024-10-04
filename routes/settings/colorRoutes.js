const express = require("express");
const {
  getColors,
  createColor,
  deleteColor,
} = require("../../controllers/settings/colorController");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const verifyUserRoles = require("../../middlewares/verifyUserRoles");
const ROLES_LIST = require("../../utils/rolesList");

const router = express.Router();

router.get("/", getColors);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  createColor
);

router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteColor
);

module.exports = router;
