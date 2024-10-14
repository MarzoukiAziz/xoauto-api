const mongoose = require("mongoose");
const { Schema } = mongoose;

const equipmentSchema = new Schema({
  safety: {
    type: [String],
    default: [],
  },
  outdoor: {
    type: [String],
    default: [],
  },
  indoor: {
    type: [String],
    default: [],
  },
  functional: {
    type: [String],
    default: [],
  },
});

module.exports = new mongoose.model("Equipment", equipmentSchema);
