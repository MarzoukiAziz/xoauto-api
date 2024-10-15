const { getAllBrands } = require("../../services/brandService");
const { getAllModels } = require("../../services/modelService");
const { getAllColors } = require("../../services/colorService");
const { getAllCategories } = require("../../services/categoryService");
const { getAllEnergies } = require("../../services/energyService");
const { getAllRegions } = require("../../services/regionService");
const { getSingleEquipment } = require("../../services/equipmentService");

const getSettings = async (req, res, next) => {
  try {
    const brands = await getAllBrands();
    const models = await getAllModels();
    const colors = await getAllColors();
    const categories = await getAllCategories();
    const energies = await getAllEnergies();
    const regions = await getAllRegions();
    const equipment = await getSingleEquipment();
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

module.exports = {
  getSettings,
};
