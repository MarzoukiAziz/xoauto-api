const Energy = require("../models/settings/Energy");

const getAllEnergies = async () => {
  return await Energy.find().sort({ name_fr: 1 });
};

const createNewEnergy = async (energyData) => {
  const energy = new Energy(energyData);
  return await energy.save();
};

const deleteEnergyById = async (id) => {
  return await Energy.findByIdAndRemove(id);
};

module.exports = {
  getAllEnergies,
  createNewEnergy,
  deleteEnergyById,
};
