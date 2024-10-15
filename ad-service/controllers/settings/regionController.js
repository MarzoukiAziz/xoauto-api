const regionService = require("../../services/regionService");

// Get all Regions
const getRegions = async (req, res, next) => {
  try {
    const regions = await regionService.getAllRegions();
    res.status(200).json(regions);
  } catch (error) {
    next(error);
  }
};

// Create a new Region
const createRegion = async (req, res, next) => {
  try {
    const region = await regionService.createNewRegion(req.body);
    res.status(201).json(region);
  } catch (error) {
    next(error);
  }
};

// Delete a Region by ID
const deleteRegion = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedRegion = await regionService.deleteRegionById(id);
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
