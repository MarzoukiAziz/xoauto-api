const Category = require("../models/settings/Category");

const getAllCategories = async () => {
  return await Category.find().sort({ name_fr: 1 });
};

const createNewCategory = async (categoryData) => {
  const category = new Category(categoryData);
  return await category.save();
};

const deleteCategoryById = async (id) => {
  return await Category.findByIdAndRemove(id);
};

module.exports = {
  getAllCategories,
  createNewCategory,
  deleteCategoryById,
};
