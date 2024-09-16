const express = require('express');
const router = express.Router();
const { createComment, updateComment, deleteComment, getCommentsByArticleId } = require('../controllers/commentController');
const verifyUserRoles = require("../middlewares/verifyUserRoles")
const ROLES_LIST = require("../utils/rolesList")
const verifyUserToken = require("../middlewares/verifyUserToken")

router.get('/article/:articleId', getCommentsByArticleId);
router.post('/', verifyUserToken, verifyUserRoles(ROLES_LIST.USER), createComment);
router.put('/:id', verifyUserToken, verifyUserRoles(ROLES_LIST.USER), updateComment);
router.delete('/:id', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN, ROLES_LIST.USER), deleteComment);

module.exports = router;
