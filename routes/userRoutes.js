const express = require("express");
const router = express.Router();
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const { getAllUsers, getUserByUid } = require("../controllers/userController");

router.get(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  getAllUsers
);
router.get(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),
  getUserByUid
);

module.exports = router;
