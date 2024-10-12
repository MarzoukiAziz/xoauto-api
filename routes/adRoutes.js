const express = require("express");
const {
  getAds,
  getAdById,
  getAdsByIds,
  createAd,
  updateAd,
  deleteAd,
  getSimilars,
  updateAdStatus,
  deleteAdByUser,
  getUserSavedAds,
  updateSavedAds,
} = require("../controllers/adController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const verifyUserToken = require("../middlewares/verifyUserToken");
const ROLES_LIST = require("../utils/rolesList");

const router = express.Router();

router.get("/search", getAds);
router.get("/selected", getAdsByIds);
router.get("/similars", getSimilars);
router.get(
  "/saved/:uid",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  getUserSavedAds
);
router.get("/:id", getAdById);

router.put(
  "/change-status/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateAdStatus
);

router.put(
  "/saved/:uid",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateSavedAds
);

router.delete(
  "/user/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  deleteAdByUser
);
router.post("/", verifyUserToken, verifyUserRoles(ROLES_LIST.USER), createAd);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  updateAd
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteAd
);

module.exports = router;
