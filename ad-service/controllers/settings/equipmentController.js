const equipmentService = require("../../services/equipmentService");

// Get the single Equipment item
const getEquipment = async (req, res, next) => {
  try {
    const equipment = await equipmentService.getSingleEquipment();
    if (!equipment) {
      return res.status(404).json({ message: "No equipment found" });
    }
    res.status(200).json(equipment);
  } catch (error) {
    next(error);
  }
};

// Update the single Equipment item
const updateEquipment = async (req, res, next) => {
  const updateData = req.body; // Get the data to update from the request body

  try {
    const updatedEquipment = await equipmentService.updateSingleEquipment(
      updateData
    );

    if (!updatedEquipment) {
      return res.status(404).json({ message: "No equipment found to update" });
    }

    res.status(200).json(updatedEquipment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEquipment,
  updateEquipment,
};
