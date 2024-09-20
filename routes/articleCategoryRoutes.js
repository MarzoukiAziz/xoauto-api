const express = require("express");
const { getCategories, createCategory, deleteCategory } = require('../controllers/articleCategoryController');
const verifyUserToken = require("../middlewares/verifyUserToken");
const verifyUserRoles = require("../middlewares/verifyUserRoles");
const ROLES_LIST = require("../utils/rolesList");

const router = express.Router();

// Get all categories
router.get('/', getCategories);

// Create a new category
router.post('/', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN), createCategory);

// Delete a category by ID
router.delete('/:id', verifyUserToken, verifyUserRoles(ROLES_LIST.ADMIN), deleteCategory);

module.exports = router;
