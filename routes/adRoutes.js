const express = require("express");
const {
  getAds,
  getAdById,
  getAdsByIds,
  createAd,
  updateAd,
  deleteAd,
  getSimilars,
} = require("../controllers/adController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const verifyUserToken = require("../middlewares/verifyUserToken");
const ROLES_LIST = require("../utils/rolesList");

const router = express.Router();

router.get("/search", getAds);
router.get("/selected", getAdsByIds);
router.get("/similars", getSimilars);
router.get("/:id", getAdById);
router.post("/", verifyUserToken, verifyUserRoles(ROLES_LIST.USER), createAd);
router.put("/:id", verifyUserToken, verifyUserRoles(ROLES_LIST.USER), updateAd);
router.delete("/:id", deleteAd);

module.exports = router;
