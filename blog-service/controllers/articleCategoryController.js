const ArticleCategory = require("../models/ArticleCategory");

// Get all categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await ArticleCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Get all categories names
const getCategoryNames = async (req, res, next) => {
  try {
    const categories = await ArticleCategory.find().exec();
    const categoryNames = categories.map((category) => category.name);
    res.status(200).json(categoryNames);
  } catch (error) {
    next(error);
  }
};

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const category = new ArticleCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete a category by ID
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCategory = await ArticleCategory.findByIdAndRemove(id);
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
  getCategoryNames,
  createCategory,
  deleteCategory,
};
