const modelService = require("../../services/modelService");

// Get all Models
const getModels = async (req, res, next) => {
  try {
    const models = await modelService.getAllModels();
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

// Get all Models with Brand info
const getModelsWithBrand = async (req, res, next) => {
  try {
    const models = await modelService.getAllModelsWithBrand();
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

// Get Models by Brand IDs
const getModelsByBrandIds = async (req, res, next) => {
  const { brandIds } = req.query;
  try {
    const models = await modelService.getModelsByBrandIds(brandIds);
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

// Create a new Model
const createModel = async (req, res, next) => {
  try {
    const model = await modelService.createNewModel(req.body);
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

// Delete a Model by ID
const deleteModel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedModel = await modelService.deleteModelById(id);
    if (!deletedModel) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.status(200).json(deletedModel);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getModels,
  getModelsWithBrand,
  getModelsByBrandIds,
  createModel,
  deleteModel,
};
