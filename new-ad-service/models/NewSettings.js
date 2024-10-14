const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSettingsSchema = new Schema({
  brands: {
    type: [String],
    default: [],
  },
});

module.exports = new mongoose.model("NewSettings", newSettingsSchema);
