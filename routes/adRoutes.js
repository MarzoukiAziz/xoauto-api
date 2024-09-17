const express = require("express");
const { getAds, getAdById, getAdsByUserId, getTodayAds, createAd, updateAd, deleteAd } = require('../controllers/adController');
const verifyUserRoles = require("../middlewares/verifyUserRoles")
const verifyUserToken = require("../middlewares/verifyUserToken")
const ROLES_LIST = require("../utils/rolesList")

const router = express.Router();

router.get('/', getAds);
router.get('/today', getTodayAds);
router.get('/by-user/:uid', getAdsByUserId);
router.get('/:id', getAdById);
router.post('/', verifyUserToken, verifyUserRoles(ROLES_LIST.USER), createAd);
router.put('/:id', verifyUserToken, verifyUserRoles(ROLES_LIST.USER), updateAd);
router.delete('/:id', deleteAd);

module.exports = router;
