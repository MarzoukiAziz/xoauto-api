const brandService = require("../../services/brandService");

// Get all Brands
const getBrands = async (req, res, next) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

// Get brand by name
const getBrandByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const brand = await brandService.getBrandByName(name);

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};

// Create a new brand
const createBrand = async (req, res, next) => {
  try {
    const brand = await brandService.createNewBrand(req.body);
    res.status(201).json(brand);
  } catch (error) {
    next(error);
  }
};

// Delete a brand by ID
const deleteBrand = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedBrand = await brandService.deleteBrandById(id);
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
  getBrandByName,
  createBrand,
  deleteBrand,
};
