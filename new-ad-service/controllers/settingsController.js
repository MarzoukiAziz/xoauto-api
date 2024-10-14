const NewSettings = require("../models/NewSettings");

const getNewSettingsWithBrands = async (req, res, next) => {
  // try {
  //   const newSettings = await NewSettings.findOne();
  //   const categories = await Category.find().sort({ name_fr: 1 });
  //   const energies = await Energy.find().sort({ name_fr: 1 });
  //   if (!newSettings) {
  //     return res.status(404).json({ message: "No settings found" });
  //   }
  //   const availableBrands = await Brand.find({
  //     _id: { $in: newSettings.brands },
  //   }).sort({ name: 1 });
  //   res.status(200).json({ brands: availableBrands, categories, energies });
  // } catch (error) {
  //   next(error);
  // }
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
  getNewSettingsWithBrands,
  getNewSettings,
  updateNewSettings,
};
