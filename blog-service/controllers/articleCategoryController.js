const {
  fetchAllCategories,
  fetchCategoryNames,
  addCategory,
  removeCategoryById,
} = require("../services/articleCategoryService");

// Get all categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await fetchAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Get all category names
const getCategoryNames = async (req, res, next) => {
  try {
    const categoryNames = await fetchCategoryNames();
    res.status(200).json(categoryNames);
  } catch (error) {
    next(error);
  }
};

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const category = await addCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete a category by ID
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await removeCategoryById(id);
    res.status(200).json(deletedCategory);
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryNames,
  createCategory,
  deleteCategory,
};
