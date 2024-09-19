const express = require('express');
const router = express.Router();
const { getDashboardHighlights } = require('../controllers/insightsController');
const verifyUserRoles = require("../middlewares/verifyUserRoles")
const ROLES_LIST = require("../utils/rolesList")
const verifyUserToken = require("../middlewares/verifyUserToken")

router.get('/dashboard-highlights', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN,), getDashboardHighlights);

module.exports = router;