const Color = require("../../models/settings/Color");

// Get all Colors
const getColors = async (req, res, next) => {
  try {
    const colors = await Color.find().sort({ name_fr: 1 });
    res.status(200).json(colors);
  } catch (error) {
    next(error);
  }
};

// Create a new color
const createColor = async (req, res, next) => {
  try {
    const color = new Color(req.body);
    await color.save();
    res.status(201).json(color);
  } catch (error) {
    next(error);
  }
};

// Delete a color by ID
const deleteColor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedColor = await Color.findByIdAndRemove(id);
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
