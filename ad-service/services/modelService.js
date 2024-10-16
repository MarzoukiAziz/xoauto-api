const Model = require("../models/settings/Model");

const getAllModels = async () => {
  return await Model.find().sort({ name: 1 });
};

const getAllModelsWithBrand = async () => {
  return await Model.find().sort({ name: 1 }).populate({
    path: "brandId",
    select: "name",
  });
};

const getModelsByBrandIds = async (brandIds) => {
  return await Model.find({ brandId: { $in: brandIds } })
    .sort({ name: 1 })
    .populate({
      path: "brandId",
      select: "name",
    });
};

const createNewModel = async (modelData) => {
  const newModel = new Model(modelData);
  await newModel.save();
  return await Model.findById(newModel._id).populate({
    path: "brandId",
    select: "name",
  });
};

const deleteModelById = async (id) => {
  return await Model.findByIdAndRemove(id);
};

module.exports = {
  getAllModels,
  getAllModelsWithBrand,
  getModelsByBrandIds,
  createNewModel,
  deleteModelById,
};
