const mongoose = require("mongoose");

const mockAdViewData = {
  _id: mongoose.Types.ObjectId(),
  adId: mongoose.Types.ObjectId(),
  userId: mongoose.Types.ObjectId(),
  viewedAt: new Date(),
};

const mockAdViews = [mockAdViewData];

module.exports = {
  mockAdViewData,
  mockAdViews,
};
