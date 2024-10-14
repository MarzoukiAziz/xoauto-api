const mongoose = require("mongoose");
const { Schema } = mongoose;

const energySchema = new Schema({
  name_fr: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Energy", energySchema);
