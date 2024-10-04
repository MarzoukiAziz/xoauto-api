const mongoose = require("mongoose");
const { Schema } = mongoose;

const colorSchema = new Schema({
  name_fr: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Color", colorSchema);
