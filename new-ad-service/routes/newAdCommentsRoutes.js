const express = require("express");
const router = express.Router();
const {
  createNewAdComment,
  updateNewAdComment,
  deleteNewAdComment,
  getNewAdCommentsByModel,
} = require("../controllers/newAdCommentController");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");
const verifyUserToken = require("../middlewares/verifyUserToken");

router.get("/model", getNewAdCommentsByModel);
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  createNewAdComment
);
router.put(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.USER),
  updateNewAdComment
);
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER),
  deleteNewAdComment
);

module.exports = router;
