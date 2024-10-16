const Ad = require("../models/Ad");
const AdView = require("../models/AdView");
const mongoose = require("mongoose");
const communicator = require("../../communicator");
const { getAllViewsByAd, createAdView } = require("./adViewService");

// Helper functions
const buildQuery = ({
  uid,
  sellerType,
  saved,
  period,
  brand,
  car_model,
  category,
  fuel_type,
  seats,
  color,
  region,
  priceMin,
  priceMax,
  autonomyMin,
  autonomyMax,
  yearMin,
  yearMax,
  mileageMin,
  mileageMax,
}) => {
  const query = {};

  if (uid) query.uid = uid;
  if (sellerType) query.pro = buildSellerTypeQuery(sellerType);
  if (saved) query._id = { $in: saved };
  if (period) query.createdAt = { $gte: getStartDateForPeriod(period) };
  if (brand) query.brand = { $in: brand };
  if (car_model) query.car_model = { $in: car_model };
  if (category) query.category = { $in: category };
  if (fuel_type) query.fuel_type = { $in: fuel_type };
  if (seats) query.seats = { $in: seats };
  if (color) query.color = { $in: color };
  if (region) query.region = { $in: region };
  if (priceMin || priceMax) query.price = { $gte: priceMin, $lte: priceMax };
  if (autonomyMin || autonomyMax)
    query.autonomy_wltp_km = { $gte: autonomyMin, $lte: autonomyMax };
  if (yearMin || yearMax)
    query["first_registration.year"] = { $gte: yearMin, $lte: yearMax };
  if (mileageMin || mileageMax)
    query.mileage = { $gte: mileageMin, $lte: mileageMax };

  return query;
};

const buildSellerTypeQuery = (sellerType) => {
  const pro = [];
  if (sellerType.includes("Pro")) pro.push(true);
  if (sellerType.includes("Particulier")) pro.push(false);
  return pro;
};

const getStartDateForPeriod = (period) => {
  const now = new Date();
  const periods = {
    1: 24 * 60 * 60 * 1000,
    7: 7 * 24 * 60 * 60 * 1000,
    30: 30 * 24 * 60 * 60 * 1000,
  };
  return new Date(now.getTime() - periods[period]);
};

const buildSortOption = (sort) => {
  const sortOptions = {
    asc: { createdAt: 1 },
    desc: { createdAt: -1 },
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
  };
  return sortOptions[sort] || {};
};

const populateAdsWithViews = async (ads) => {
  const adIds = ads.map((ad) => ad._id);
  const viewCounts = await getAllViewsByAd(adIds);

  const viewCountMap = viewCounts.reduce((map, { _id, viewCount }) => {
    map[String(_id)] = viewCount;
    return map;
  }, {});

  return ads.map((ad) => ({
    ...ad.toObject(),
    views: viewCountMap[String(ad._id)] || 0,
  }));
};

// Main functions
const getAds = async (queryOptions) => {
  const { size, page, sort, includeViews, saved } = queryOptions;

  if (saved) {
    queryOptions.saved = await communicator.getSavedAds(saved);
  }

  const query = buildQuery(queryOptions);
  const sortOption = buildSortOption(sort);

  let adsQuery = Ad.find(query)
    .sort(sortOption)
    .skip(size * (page - 1))
    .limit(parseInt(size));

  let ads;

  if (includeViews === "true") {
    const adsQueryWithUser = adsQuery.populate({
      path: "uid",
      select: "name pro avatar",
    });
    ads = await adsQueryWithUser;

    ads = await populateAdsWithViews(ads);
  } else {
    ads = await adsQuery;
  }

  const count = await Ad.countDocuments(query);
  return { ads, count };
};

const getAdById = async (id, includeViews, view, userAgent, userId) => {
  const ad = await Ad.findById(id).populate({
    path: "uid",
    select: "name email createdAt pro avatar",
  });
  if (!ad) return null;

  if (view === "true") {
    await createAdView({ adId: id, uid: userId, viewerAgent: userAgent });
  }

  if (includeViews === "true") {
    const viewCount = await getAllViewsByAd([mongoose.Types.ObjectId(id)]);
    ad.views = viewCount.length > 0 ? viewCount[0].viewCount : 0;
  }

  return ad;
};

const getAdsByIds = async (adsId) => {
  const adIdsArray = adsId.split(",").map((id) => mongoose.Types.ObjectId(id));
  return Ad.find({ _id: { $in: adIdsArray } });
};

const getSimilars = async (category, adId, price) => {
  const minPrice = 0.7 * price;
  const maxPrice = 1.3 * price;
  const ads = await Ad.find({
    price: { $gte: minPrice, $lte: maxPrice },
    category,
    active: true,
    sold: false,
  })
    .sort({ createdAt: -1 })
    .limit(8);

  return ads.filter((doc) => doc._id.toString() !== adId);
};

const getStats = async () => {
  const startOfLast30Days = new Date(
    new Date().setDate(new Date().getDate() - 30)
  );

  const newAdsLast30Days = await Ad.countDocuments({
    createdAt: { $gte: startOfLast30Days },
  });

  const adsViewsLast30Days = await AdView.aggregate([
    { $match: { viewedAt: { $gte: startOfLast30Days } } },
    { $group: { _id: null, totalViews: { $sum: 1 } } },
  ]);

  return {
    newAdsLast30Days,
    adViewsLast30Days: adsViewsLast30Days.length
      ? adsViewsLast30Days[0].totalViews
      : 0,
  };
};

const getUserAdsCount = async (uid) => {
  return Ad.countDocuments({ uid: { $eq: uid } });
};

const createAd = async (adData) => {
  const ad = new Ad(adData);
  return ad.save();
};

const updateAd = async (id, updateData) => {
  await Ad.findByIdAndUpdate(id, updateData, { new: true });
  return Ad.findById(id).populate({
    path: "uid",
    select: "name email pro avatar",
  });
};

const deleteAd = async (id) => {
  return Ad.findByIdAndDelete(id);
};

const updateAdStatus = async (id, uid, status) => {
  const ad = await Ad.findById(id);
  if (!ad || ad.uid != uid) return null;

  ad.sold = status;
  return await Ad.findByIdAndUpdate(id, ad, { new: true }).populate({
    path: "uid",
    select: "name email createdAt pro avatar",
  });
};

const deleteAdByUser = async (id, uid) => {
  const ad = await Ad.findById(id);
  if (!ad || ad.uid != uid) return null;
  return await Ad.findByIdAndDelete(id);
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
