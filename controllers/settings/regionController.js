const Region = require("../../models/settings/Region");

// Get all Regions
const getRegions = async (req, res, next) => {
  try {
    const regions = await Region.find().sort({ name_fr: 1 });
    res.status(200).json(regions);
  } catch (error) {
    next(error);
  }
};

// Create a new region
const createRegion = async (req, res, next) => {
  try {
    const region = new Region(req.body);
    await region.save();
    res.status(201).json(region);
  } catch (error) {
    next(error);
  }
};

// Delete a region by ID
const deleteRegion = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRegion = await Region.findByIdAndRemove(id);
    if (!deletedRegion) {
      return res.status(404).json({ message: "Region not found" });
    }
    res.status(200).json(deletedRegion);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRegions,
  createRegion,
  deleteRegion,
};
