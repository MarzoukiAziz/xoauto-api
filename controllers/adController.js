const Ad = require("../models/Ad");
const AdView = require("../models/AdView");
const mongoose = require("mongoose");

const getAds = async (req, res, next) => {
  try {
    const {
      size = 9,
      page = 1,
      sort = "desc",
      includeViews = "false",
      uid = "",
      period = "",
      type = "",
      category = "",
      fuel_type = "",
      brand = "",
      model = "",
      priceMin = 0,
      priceMax = Infinity,
      wltpMin = 0,
      wltpMax = Infinity,
      yearMin = 1900,
      yearMax = new Date().getFullYear(),
      mileageMin = 0,
      mileageMax = Infinity,
      seats = 0,
      color = "",
      crit_air = "",
      horsepowerMin = 0,
      horsepowerMax = Infinity,
      options = {},
      courantAC = "",
      courantDC = "",
    } = req.query;

    // Create the base query object
    const query = {};

    // Filter by user ID if provided
    if (uid) query.uid = uid;

    // Filter by date period
    if (period) {
      const now = new Date();
      let startDate;
      if (period == 1) {
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours
      } else if (period == 7) {
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last week
      } else if (period == 30) {
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Last month
      }
      query.createdAt = { $gte: startDate };
    }

    // Add other filters based on the ad model fields
    if (type) query.type = type;
    if (category) query.category = category;
    if (fuel_type) query.fuel_type = fuel_type;
    if (brand) query.brand = brand;
    if (model) query.model = model;
    if (priceMin || priceMax) query.price = { $gte: priceMin, $lte: priceMax };
    if (wltpMin || wltpMax)
      query.autonomy_wltp_km = { $gte: wltpMin, $lte: wltpMax };
    if (yearMin || yearMax)
      query["first_registration.year"] = { $gte: yearMin, $lte: yearMax };
    if (mileageMin || mileageMax)
      query.mileage = { $gte: mileageMin, $lte: mileageMax };
    if (seats) query.seats = seats;
    if (color) query.color = color;
    if (crit_air) query.crit_air = crit_air;
    if (horsepowerMin || horsepowerMax)
      query.horsepower = { $gte: horsepowerMin, $lte: horsepowerMax };
    if (courantAC) query["courant.AC"] = courantAC;
    if (courantDC) query["courant.DC"] = courantDC;

    // Filter for vehicle options
    for (const [key, value] of Object.entries(options)) {
      if (value === "true") {
        query[`options_vehicule.${key}`] = true;
      }
    }

    // Fetch ads with the constructed query
    const adsQuery = Ad.find(query)
      .sort({ createdAt: sort === "asc" ? 1 : -1 })
      .skip(size * (page - 1))
      .limit(parseInt(size))
      .populate({
        path: "uid",
        select: "name",
      });
    let ads = await adsQuery;

    // Include views if requested
    if (includeViews === "true") {
      const adIds = ads.map((ad) => ad._id);
      const viewCounts = await AdView.aggregate([
        { $match: { adId: { $in: adIds } } },
        { $group: { _id: "$adId", viewCount: { $sum: 1 } } },
      ]);
      const viewCountMap = viewCounts.reduce((map, { _id, viewCount }) => {
        map[_id.toString()] = viewCount;
        return map;
      }, {});
      ads = ads.map((ad) => ({
        ...ad.toObject(),
        views: viewCountMap[ad._id.toString()] || 0,
      }));
    }

    // Count total ads based on the filters
    const count = await Ad.countDocuments(query);
    res.status(200).json({ ads, count });
  } catch (error) {
    next(error);
  }
};

const getAdById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { view, includeViews } = req.query;

    const ad = await Ad.findById(id).populate({
      path: "uid",
      select: "name email createdAt pro avatar",
    });

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    if (view === "true") {
      const userId = req.user ? req.user.id : null;
      const viewerAgent = req.headers["user-agent"];

      //ToDo add location
      //const location = {};

      const newView = new AdView({
        adId: id,
        userId,
        viewerAgent,
        // location
      });

      await newView.save();
    }

    if (includeViews === "true") {
      const viewCount = await AdView.aggregate([
        { $match: { adId: mongoose.Types.ObjectId(id) } },
        { $group: { _id: "$adId", viewCount: { $sum: 1 } } },
      ]);

      ad.views = viewCount.length > 0 ? viewCount[0].viewCount : 0;
    }

    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

const getAdsByIds = async (req, res, next) => {
  try {
    const { adsId } = req.query; // Retrieve comma-separated ad IDs from query params

    if (!adsId) {
      return res.status(400).json({ message: "No ad IDs provided" });
    }
    const adIdsArray = adsId
      .split(",")
      .map((id) => mongoose.Types.ObjectId(id));

    const ads = await Ad.find({ _id: { $in: adIdsArray } });

    if (!ads || ads.length === 0) {
      return res.status(404).json({ message: "Ads not found" });
    }

    res.status(200).json(ads);
  } catch (error) {
    next(error);
  }
};

const getSimilars = async (req, res, next) => {
  try {
    const { category, adId, price } = req.query;
    const minPrice = 0.7 * price;
    const maxPrice = 1.3 * price;
    const adsQuery = Ad.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
      category: category,
      active: true,
      sold: false,
    }).sort({ createdAt: -1 });

    const result = [];

    try {
      const documents = await adsQuery.limit(8).exec();
      for (const d of documents) {
        if (d._id == adId) continue;

        result.push(d);
      }
      console.log(result.length);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).json({
        message: "Fetching ads failed!" + error,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createAd = async (req, res, next) => {
  try {
    const ad = new Ad(req.body);
    await ad.save();
    res.status(201).json(ad);
  } catch (error) {
    next(error);
  }
};

const updateAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData.views;

    const ad = await Ad.findByIdAndUpdate(id, updateData, { new: true });
    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

const deleteAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ad = await Ad.findByIdAndDelete(id);

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

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
  createAd,
  updateAd,
  deleteAd,
};
