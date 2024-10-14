const express = require("express");
const {
  getNewAds,
  getNewAdById,
  getNewAdsByIds,
  getAdsByBrand,
  createNewAd,
  updateNewAd,
  deleteNewAd,
  getSimilars,
} = require("../controllers/newAdController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const verifyUserToken = require("../middlewares/verifyUserToken");
const ROLES_LIST = require("../utils/rolesList");

const router = express.Router();

router.get("/search", getNewAds);
router.get("/brand", getAdsByBrand);
router.get("/selected", getNewAdsByIds);
router.get("/similars", getSimilars);
router.get("/:id", getNewAdById);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  createNewAd
);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateNewAd
);
router.delete("/:id", deleteNewAd);

module.exports = router;
