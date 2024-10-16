const Color = require("../models/settings/Color");

const getAllColors = async () => {
  return await Color.find().sort({ name_fr: 1 });
};

const createNewColor = async (colorData) => {
  const color = new Color(colorData);
  return await color.save();
};

const deleteColorById = async (id) => {
  return await Color.findByIdAndRemove(id);
};

module.exports = {
  getAllColors,
  createNewColor,
  deleteColorById,
};
