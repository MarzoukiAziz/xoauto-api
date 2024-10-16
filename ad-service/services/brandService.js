const Brand = require("../models/settings/Brand");

const getAllBrands = async () => {
  return await Brand.find().sort({ name: 1 });
};

const getBrandByName = async (name) => {
  return await Brand.findOne({ name: name });
};

const createNewBrand = async (brandData) => {
  const brand = new Brand(brandData);
  return await brand.save();
};

const deleteBrandById = async (id) => {
  return await Brand.findByIdAndRemove(id);
};

module.exports = {
  getAllBrands,
  getBrandByName,
  createNewBrand,
  deleteBrandById,
};
