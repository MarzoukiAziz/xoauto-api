const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name_fr: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Category", categorySchema);
