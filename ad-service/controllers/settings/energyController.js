const energyService = require("../../services/energyService");

// Get all Energies
const getEnergies = async (req, res, next) => {
  try {
    const energies = await energyService.getAllEnergies();
    res.status(200).json(energies);
  } catch (error) {
    next(error);
  }
};

// Create a new Energy
const createEnergy = async (req, res, next) => {
  try {
    const energy = await energyService.createNewEnergy(req.body);
    res.status(201).json(energy);
  } catch (error) {
    next(error);
  }
};

// Delete an Energy by ID
const deleteEnergy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedEnergy = await energyService.deleteEnergyById(id);
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
