const express = require("express");
const router = express.Router();
const {
  getDashboardHighlights,
  getUserHighlights,
} = require("../controllers/insightsController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.get(
  "/dashboard-highlights",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  getDashboardHighlights
);
router.get(
  "/user-highlights",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  getUserHighlights
);

module.exports = router;
