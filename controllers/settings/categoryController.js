const Category = require("../../models/settings/Category");

// Get all Categories
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name_fr: 1 });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);
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
    const deletedCategory = await Category.findByIdAndRemove(id);
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
