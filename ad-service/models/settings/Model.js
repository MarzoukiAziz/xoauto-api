const mongoose = require("mongoose");
const { Schema } = mongoose;

const modelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
});

module.exports = new mongoose.model("Model", modelSchema);
