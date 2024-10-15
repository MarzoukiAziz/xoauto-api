const NewSettings = require("../models/NewSettings");
const communicator = require("../../communicator");

const getNewSettings = async () => {
  return await NewSettings.findOne();
};

const getNewSettingsWithBrands = async () => {
  const newSettings = await getNewSettings();
  if (!newSettings) return null;

  const categories = await communicator.getCategories();
  const energies = await communicator.getEnergies();
  const brands = await communicator.getBrands();

  const availableBrands = brands.filter((brand) =>
    newSettings.brands.includes(brand._id)
  );

  return { availableBrands, categories, energies };
};

const updateNewSettings = async (updateData) => {
  return await NewSettings.findOneAndUpdate({}, updateData, {
    new: true,
  });
};

module.exports = {
  getNewSettings,
  getNewSettingsWithBrands,
  updateNewSettings,
};
