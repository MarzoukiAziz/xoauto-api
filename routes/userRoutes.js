const express = require("express");
const router = express.Router();
const verifyUserToken = require("../middlewares/verifyUserToken")
const verifyUserRoles = require("../middlewares/verifyUserRoles")
const ROLES_LIST = require("../utils/rolesList")
const { registerUser, loginUser, generateAccessToken, changePassword, forgetPassword, resetPassword, softDeleteUser, getAllUsers, getUserByUid, getMyAccount } = require('../controllers/userController')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/generate-access-token', generateAccessToken);
router.post("/change-password", verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), changePassword);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.delete("/:id", verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), softDeleteUser);

router.get("/my-account", verifyUserToken, getMyAccount);
router.get("/", verifyUserRoles(ROLES_LIST.ADMIN), getAllUsers);
router.get("/:id", verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), getUserByUid);

module.exports = router;
