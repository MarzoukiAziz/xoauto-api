const newSettingsService = require("../services/newSettingsService");

const getNewSettingsWithBrands = async (req, res, next) => {
  try {
    const result = await newSettingsService.getNewSettingsWithBrands();

    if (!result) {
      return res.status(404).json({ message: "No settings found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getNewSettings = async (req, res, next) => {
  try {
    const newSettings = await newSettingsService.getNewSettings();
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
    const updatedSettings = await newSettingsService.updateNewSettings(
      updateData
    );

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
