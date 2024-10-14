const ArticleCategory = require("../models/ArticleCategory");

const fetchAllCategories = async () => {
  return await ArticleCategory.find();
};

const fetchCategoryNames = async () => {
  const categories = await ArticleCategory.find();
  return categories.map((category) => category.name);
};

const addCategory = async (categoryData) => {
  const category = new ArticleCategory(categoryData);
  return await category.save();
};

const removeCategoryById = async (id) => {
  const deletedCategory = await ArticleCategory.findByIdAndRemove(id);
  if (!deletedCategory) {
    throw new Error("Category not found");
  }
  return deletedCategory;
};

module.exports = {
  fetchAllCategories,
  fetchCategoryNames,
  addCategory,
  removeCategoryById,
};
