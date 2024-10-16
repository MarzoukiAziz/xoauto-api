const Region = require("../models/settings/Region");

const getAllRegions = async () => {
  return await Region.find().sort({ name_fr: 1 });
};

const createNewRegion = async (regionData) => {
  const region = new Region(regionData);
  return await region.save();
};

const deleteRegionById = async (id) => {
  return await Region.findByIdAndRemove(id);
};

module.exports = {
  getAllRegions,
  createNewRegion,
  deleteRegionById,
};
