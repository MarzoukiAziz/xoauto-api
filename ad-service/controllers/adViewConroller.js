const adViewService = require("../services/adViewService");

const createAdView = async (req, res, next) => {
  try {
    const adView = await adViewService.createAdView(req.body);
    res.status(201).json(adView);
  } catch (error) {
    next(error);
  }
};

const getViewsByAdId = async (req, res, next) => {
  try {
    const views = await adViewService.getViewsByAdId(req.params.adId);
    res.status(200).json(views);
  } catch (error) {
    next(error);
  }
};

const getViewsByUserId = async (req, res, next) => {
  try {
    const views = await adViewService.getViewsByUserId(req.params.userId);
    res.status(200).json(views);
  } catch (error) {
    next(error);
  }
};

const getAllAdViews = async (req, res, next) => {
  try {
    const adViews = await adViewService.getAllAdViews(req.query);
    res.status(200).json(adViews);
  } catch (error) {
    next(error);
  }
};

const deleteAdView = async (req, res, next) => {
  try {
    const adView = await adViewService.deleteAdView(req.params.id);
    if (!adView) {
      return res.status(404).json({ message: "Ad view not found" });
    }
    res.status(200).json({ message: "Ad view deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdView,
  getViewsByAdId,
  getViewsByUserId,
  getAllAdViews,
  deleteAdView,
};
