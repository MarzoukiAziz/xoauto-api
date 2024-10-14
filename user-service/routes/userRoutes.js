const express = require("express");
const router = express.Router();
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const {
  getAllUsers,
  getUserByUid,
  getUserIdByCognitoId,
  getUserSavedAds,
  getUserStats,
  updateSavedAds,
} = require("../controllers/userController");

router.get(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  getAllUsers
);
router.get(
  "/stats",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  getUserStats
);

router.get("/cid/:cid", verifyUserToken, getUserIdByCognitoId);
router.get(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),
  getUserByUid
);

router.get(
  "/saved/:uid",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  getUserSavedAds
);

router.put(
  "/saved/:uid",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateSavedAds
);

module.exports = router;
