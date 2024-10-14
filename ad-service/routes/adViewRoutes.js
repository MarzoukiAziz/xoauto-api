const express = require("express");
const {
  getViewsByAdId,
  getViewsByUserId,
  getAllAdViews,
  createAdView,
  deleteAdView,
} = require("../controllers/adViewConroller");
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const router = express.Router();

router.get(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  getAllAdViews
);
router.get("/ad/:adId", verifyUserToken, getViewsByAdId);
router.get("/user/:userId", verifyUserToken, getViewsByUserId);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  createAdView
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteAdView
);

module.exports = router;
