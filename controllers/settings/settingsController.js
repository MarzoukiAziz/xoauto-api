const Brand = require("../../models/settings/Brand");
const Model = require("../../models/settings/Model");
const Color = require("../../models/settings/Color");
const Category = require("../../models/settings/Category");
const Energy = require("../../models/settings/Energy");
const Region = require("../../models/settings/Region");

// Get Settings
const getSettings = async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    const models = await Model.find().sort({ name: 1 });
    const colors = await Color.find().sort({ name_fr: 1 });
    const categories = await Category.find().sort({ name_fr: 1 });
    const energies = await Energy.find().sort({ name_fr: 1 });
    const regions = await Region.find().sort({ name_fr: 1 });
    const settings = {
      brands,
      models,
      colors,
      categories,
      energies,
      regions,
    };

    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
};
