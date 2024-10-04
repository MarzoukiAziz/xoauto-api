const mongoose = require("mongoose");
const { Schema } = mongoose;

const regionSchema = new Schema({
  name_fr: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Region", regionSchema);
