const Model = require("../../models/settings/Model");

// Get all Models
const getModels = async (req, res, next) => {
  try {
    const models = await Model.find().sort({ name: 1 });
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

// Get Models by Brands Id
const getModelsByBrandIds = async (req, res, next) => {
  const { brandIds } = req.query;
  try {
    const models = await Model.find({ brandId: { $in: brandIds } }).sort({
      name: 1,
    });
    res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};

// Create a new model
const createModel = async (req, res, next) => {
  try {
    const model = new Model(req.body);
    await model.save();
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

// Delete a model by ID
const deleteModel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedModel = await Model.findByIdAndRemove(id);
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
  getModelsByBrandIds,
  createModel,
  deleteModel,
};
