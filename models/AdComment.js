const mongoose = require("mongoose");
const { Schema } = mongoose;

const adCommentSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    adId: {
      type: String,
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

module.exports = new mongoose.model("AdComment", adCommentSchema);
