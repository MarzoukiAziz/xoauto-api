const categoryService = require("../../services/categoryService");

// Get all Categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Create a new Category
const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createNewCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete a Category by ID
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCategory = await categoryService.deleteCategoryById(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};
