const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryNames,
} = require("../../controllers/settings/articleCategoryController");
const verifyUserToken = require("../../middlewares/verifyUserToken");
const verifyUserRoles = require("../../middlewares/verifyUserRoles");
const ROLES_LIST = require("../../utils/rolesList");

const router = express.Router();

// Get all categories
router.get("/", getCategories);

// Get all category names
router.get("/names", getCategoryNames);

// Create a new category
router.post(
  "/",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  createCategory
);

// Delete a category by ID
router.delete(
  "/:id",
  verifyUserToken,
  verifyUserRoles(ROLES_LIST.ADMIN),
  deleteCategory
);

module.exports = router;
