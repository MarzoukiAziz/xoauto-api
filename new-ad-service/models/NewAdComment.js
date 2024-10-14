const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: { type: String, required: false },
});

new mongoose.model("User", userSchema);

const newAdCommentSchema = new Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    adId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NewAd",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    answerTo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new mongoose.model("NewAdComment", newAdCommentSchema);
