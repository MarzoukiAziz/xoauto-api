const express = require("express");
const router = express.Router();
const {
  createAdComment,
  updateAdComment,
  deleteAdComment,
  getAdCommentsByModel,
} = require("../controllers/adCommentController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.get("/model", getAdCommentsByModel);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  createAdComment
);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateAdComment
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),
  deleteAdComment
);

module.exports = router;
