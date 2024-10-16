const adService = require("../services/adService");

const getAds = async (req, res, next) => {
  try {
    const adsData = await adService.getAds(req.query);
    res.status(200).json(adsData);
  } catch (error) {
    next(error);
  }
};

const getAdById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { includeViews, view } = req.query;
    const ad = await adService.getAdById(
      id,
      includeViews,
      view,
      req.headers["user-agent"],
      req.user ? req.user.id : null
    );

    if (!ad) return res.status(404).json({ message: "Ad not found" });

    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

const getAdsByIds = async (req, res, next) => {
  try {
    const ads = await adService.getAdsByIds(req.query.adsId);
    res.status(200).json(ads);
  } catch (error) {
    next(error);
  }
};

const getSimilars = async (req, res, next) => {
  try {
    const { category, price, adId } = req.query;
    const similars = await adService.getSimilars(category, adId, price);
    res.status(200).json(similars);
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await adService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

const getUserAdsCount = async (req, res, next) => {
  try {
    const count = await adService.getUserAdsCount(req.params.uid);
    res.status(200).json(count);
  } catch (error) {
    next(error);
  }
};

const createAd = async (req, res, next) => {
  try {
    const ad = await adService.createAd(req.body);
    res.status(201).json(ad);
  } catch (error) {
    next(error);
  }
};

const updateAd = async (req, res, next) => {
  try {
    const ad = await adService.updateAd(req.params.id, req.body);
    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

const deleteAd = async (req, res, next) => {
  try {
    await adService.deleteAd(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const updateAdStatus = async (req, res, next) => {
  try {
    const ad = await adService.updateAdStatus(
      req.params.id,
      req.query.uid,
      req.query.status
    );
    if (!ad)
      return res
        .status(404)
        .json({ message: "Ad not found or not authorized" });
    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

const deleteAdByUser = async (req, res, next) => {
  try {
    const ad = await adService.deleteAdByUser(req.params.id, req.query.uid);
    if (!ad)
      return res
        .status(404)
        .json({ message: "Ad not found or not authorized" });
    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAds,
  getAdById,
  getAdsByIds,
  getSimilars,
  getStats,
  getUserAdsCount,
  createAd,
  updateAd,
  deleteAd,
  updateAdStatus,
  deleteAdByUser,
};
