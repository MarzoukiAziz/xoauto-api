const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please enter a valid email",
      ],
    },
    avatar: { type: String, required: false },
    pro: { type: Boolean, default: false },
    saved_ads: {
      type: [String],
      default: [],
    },
    lastLogin: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("User", userSchema);
