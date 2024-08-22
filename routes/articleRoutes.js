const express = require("express");
const { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const verifyUserToken = require("../middlewares/verifyUserToken")
const verifyUserRoles = require("../middlewares/verifyUserRoles")
const ROLES_LIST = require("../utils/rolesList")

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:id', getArticleById);
router.post('/', verifyUserRoles(ROLES_LIST.ADMIN), createArticle);
router.put('/:id', verifyUserRoles(ROLES_LIST.ADMIN), updateArticle);
router.delete('/:id', verifyUserRoles(ROLES_LIST.ADMIN), deleteArticle);

module.exports = router;
