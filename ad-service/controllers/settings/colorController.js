const colorService = require("../../services/colorService");

// Get all Colors
const getColors = async (req, res, next) => {
  try {
    const colors = await colorService.getAllColors();
    res.status(200).json(colors);
  } catch (error) {
    next(error);
  }
};

// Create a new Color
const createColor = async (req, res, next) => {
  try {
    const color = await colorService.createNewColor(req.body);
    res.status(201).json(color);
  } catch (error) {
    next(error);
  }
};

// Delete a Color by ID
const deleteColor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedColor = await colorService.deleteColorById(id);
    if (!deletedColor) {
      return res.status(404).json({ message: "Color not found" });
    }
    res.status(200).json(deletedColor);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getColors,
  createColor,
  deleteColor,
};
