const express = require("express");
const router = express.Router();
const {
  verifyregistrationCode,
  signUp,
  logIn,
  verifyToken,
  changeUserAccess,
} = require("../controllers/cognitoController");
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");

router.post("/signup", signUp);
router.post("/confirm-phone", verifyregistrationCode);
router.post("/login", logIn);
router.get("/verify", verifyToken);

router.put(
  "/change-user-access",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  changeUserAccess
);

module.exports = router;
