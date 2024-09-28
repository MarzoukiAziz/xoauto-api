const express = require("express");
const router = express.Router();
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const {
  getAllUsers,
  getUserByUid,
  getUserIdByCognitoId,
} = require("../controllers/userController");

router.get(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  getAllUsers
);
router.get(
  "/cid/:cid",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),
  getUserIdByCognitoId
);
router.get(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),
  getUserByUid
);

module.exports = router;
