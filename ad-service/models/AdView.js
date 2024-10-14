const mongoose = require("mongoose");

const AdViewSchema = new mongoose.Schema({
  adId: { type: mongoose.Schema.Types.ObjectId, ref: "Ad", required: true },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  viewedAt: { type: Date, default: Date.now },
  viewerAgent: { type: String, required: false },
});

module.exports = new mongoose.model("AdView", AdViewSchema);
