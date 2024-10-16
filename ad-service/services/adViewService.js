const AdView = require("../models/AdView");

const createAdView = async (adViewData) => {
  const adView = new AdView(adViewData);
  return await adView.save();
};

const getViewsByAdId = async (adId) => {
  return await AdView.find({ adId }).populate({
    path: "userId",
    select: "name email",
  });
};

const getViewsByUserId = async (uid) => {
  return await AdView.find({ uid }).populate("adId", "title");
};

const getAllAdViews = async (filters) => {
  const { startDate, endDate, viewerAgent } = filters;

  let query = {};
  if (startDate || endDate) {
    query.viewedAt = {};
    if (startDate) query.viewedAt.$gte = new Date(startDate);
    if (endDate) query.viewedAt.$lte = new Date(endDate);
  }

  if (viewerAgent) {
    query.viewerAgent = { $regex: viewerAgent, $options: "i" };
  }

  return await AdView.find(query);
};

const deleteAdView = async (id) => {
  return await AdView.findByIdAndDelete(id);
};

module.exports = {
  createAdView,
  getViewsByAdId,
  getViewsByUserId,
  getAllAdViews,
  deleteAdView,
};
