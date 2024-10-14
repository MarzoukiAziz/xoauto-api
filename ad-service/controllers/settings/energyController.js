const Energy = require("../../models/settings/Energy");

// Get all Energies
const getEnergies = async (req, res, next) => {
  try {
    const energies = await Energy.find().sort({ name_fr: 1 });
    res.status(200).json(energies);
  } catch (error) {
    next(error);
  }
};

// Create a new energy
const createEnergy = async (req, res, next) => {
  try {
    const energy = new Energy(req.body);
    await energy.save();
    res.status(201).json(energy);
  } catch (error) {
    next(error);
  }
};

// Delete a energy by ID
const deleteEnergy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedEnergy = await Energy.findByIdAndRemove(id);
    if (!deletedEnergy) {
      return res.status(404).json({ message: "Energy not found" });
    }
    res.status(200).json(deletedEnergy);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEnergies,
  createEnergy,
  deleteEnergy,
};
