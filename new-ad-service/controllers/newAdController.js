const newAdService = require("../services/newAdService");

const getNewAds = async (req, res, next) => {
  try {
    const result = await newAdService.getNewAds(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getNewAdById = async (req, res, next) => {
  try {
    const newNewAd = await newAdService.getNewAdById(req.params.id);
    if (!newNewAd) {
      return res.status(404).json({ message: "NewAd not found" });
    }
    res.status(200).json(newNewAd);
  } catch (error) {
    next(error);
  }
};

const getNewAdsByIds = async (req, res, next) => {
  try {
    const newNewAds = await newAdService.getNewAdsByIds(req.query.versionsIds);
    if (!newNewAds || newNewAds.length === 0) {
      return res.status(404).json({ message: "NewAds not found" });
    }
    res.status(200).json(newNewAds);
  } catch (error) {
    next(error);
  }
};

const getSimilars = async (req, res, next) => {
  try {
    const result = await newAdService.getSimilars(req.query);
    res.status(200).json({ ads: result });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createNewAd = async (req, res, next) => {
  try {
    const newNewAd = await newAdService.createNewAd(req.body);
    res.status(201).json(newNewAd);
  } catch (error) {
    next(error);
  }
};

const updateNewAd = async (req, res, next) => {
  try {
    const newNewAd = await newAdService.updateNewAd(req.params.id, req.body);
    if (!newNewAd) {
      return res.status(404).json({ message: "NewAd not found" });
    }
    res.status(200).json(newNewAd);
  } catch (error) {
    next(error);
  }
};

const deleteNewAd = async (req, res, next) => {
  try {
    const newNewAd = await newAdService.deleteNewAd(req.params.id);
    if (!newNewAd) {
      return res.status(404).json({ message: "NewAd not found" });
    }
    res.status(200).json(newNewAd);
  } catch (error) {
    next(error);
  }
};

const getAdsByBrand = async (req, res, next) => {
  try {
    const groupedAds = await newAdService.getAdsByBrand(req.query);
    res.status(200).json({ ads: groupedAds });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNewAds,
  getNewAdById,
  getNewAdsByIds,
  getAdsByBrand,
  getSimilars,
  createNewAd,
  updateNewAd,
  deleteNewAd,
};
