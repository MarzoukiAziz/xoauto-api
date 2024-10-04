const Brand = require("../../models/settings/Brand");

// Get all Brands
const getBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

// Create a new brand
const createBrand = async (req, res, next) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
};

// Delete a brand by ID
const deleteBrand = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBrand = await Brand.findByIdAndRemove(id);
    if (!deletedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(deletedBrand);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBrands,
  createBrand,
  deleteBrand,
};
