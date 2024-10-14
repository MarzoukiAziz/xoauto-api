const express = require("express");
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const verifyUserRoles = require("../middlewares/verifyUserRoles")
const verifyUserToken = require("../middlewares/verifyUserToken")
const ROLES_LIST = require("../utils/rolesList")

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN), createArticle);
router.put('/:id', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN), updateArticle);
router.delete('/:id', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN), deleteArticle);

module.exports = router;
