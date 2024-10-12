const Brand = require("../../models/settings/Brand");
const Model = require("../../models/settings/Model");
const Color = require("../../models/settings/Color");
const Category = require("../../models/settings/Category");
const Energy = require("../../models/settings/Energy");
const Region = require("../../models/settings/Region");
const Equipment = require("../../models/settings/Equipment");
const NewSettings = require("../../models/settings/NewSettings");

/***********************
 * USED
 ****************/
// Get Settings
const getSettings = async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    const models = await Model.find().sort({ name: 1 });
    const colors = await Color.find().sort({ name_fr: 1 });
    const categories = await Category.find().sort({ name_fr: 1 });
    const energies = await Energy.find().sort({ name_fr: 1 });
    const regions = await Region.find().sort({ name_fr: 1 });
    const equipment = await Equipment.findOne();
    const settings = {
      brands,
      models,
      colors,
      categories,
      energies,
      regions,
      equipment,
    };

    res.status(200).json(settings);
  } catch (error) {
    next(error);
  }
};

/***********************
 * NEW
 ****************/

const getNewSettingsWithBrands = async (req, res, next) => {
  try {
    const newSettings = await NewSettings.findOne();
    const categories = await Category.find().sort({ name_fr: 1 });
    const energies = await Energy.find().sort({ name_fr: 1 });

    if (!newSettings) {
      return res.status(404).json({ message: "No settings found" });
    }
    const availableBrands = await Brand.find({
      _id: { $in: newSettings.brands },
    }).sort({ name: 1 });

    res.status(200).json({ brands: availableBrands, categories, energies });
  } catch (error) {
    next(error);
  }
};

const getNewSettings = async (req, res, next) => {
  try {
    const newSettings = await NewSettings.findOne();
    if (!newSettings) {
      return res.status(404).json({ message: "No settings found" });
    }

    res.status(200).json(newSettings);
  } catch (error) {
    next(error);
  }
};

const updateNewSettings = async (req, res, next) => {
  const updateData = req.body;

  try {
    const updatedSettings = await NewSettings.findOneAndUpdate({}, updateData, {
      new: true,
    });

    if (!updatedSettings) {
      return res.status(404).json({ message: "No settings found to update" });
    }

    res.status(200).json(updatedSettings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSettings,
  getNewSettingsWithBrands,
  getNewSettings,
  updateNewSettings,
};
