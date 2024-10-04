const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Brand", brandSchema);
