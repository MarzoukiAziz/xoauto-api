const express = require("express");
const {
  getAds,
  getAdById,
  getAdsByIds,
  getStats,
  getUserAdsCount,
  createAd,
  updateAd,
  deleteAd,
  getSimilars,
  updateAdStatus,
  deleteAdByUser,
} = require("../controllers/adController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const verifyUserToken = require("../middlewares/verifyUserToken");
const ROLES_LIST = require("../utils/rolesList");

const router = express.Router();

router.get("/search", getAds);
router.get("/selected", getAdsByIds);
router.get("/similars", getSimilars);
router.get("/stats", getStats);
router.get("/user-ads-count/:uid", getUserAdsCount);
router.get("/:id", getAdById);
router.post("/", verifyUserToken, verifyUserRoles(ROLES_LIST.USER), createAd);

router.put(
  "/change-status/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateAdStatus
);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  updateAd
);
router.delete(
  "/user/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  deleteAdByUser
);

router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteAd
);

module.exports = router;
