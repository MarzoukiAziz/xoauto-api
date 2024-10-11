const NewAd = require("../models/NewAd");
const mongoose = require("mongoose");
const User = require("../models/User");

const getNewAds = async (req, res, next) => {
  try {
    const {
      size = 9,
      page = 1,
      sort = "desc",
      category,
      fuel_type,
      seats,
      brand,
      model,
      priceMin,
      priceMax,
      autonomyMin,
      autonomyMax,
    } = req.query;

    // Create the base query object
    const query = {};

    // NewAdd other filters based on the newNewAd model fields
    if (brand) query.brand = { $in: brand };
    if (model) query.model = { $in: model };
    if (category) query.category = { $in: category };
    if (fuel_type) query.fuel_type = { $in: fuel_type };
    if (seats) query.seats = { $in: seats };
    if (priceMin || priceMax) query.price = { $gte: priceMin, $lte: priceMax };
    if (autonomyMin || autonomyMax)
      query.autonomy_wltp_km = { $gte: autonomyMin, $lte: autonomyMax };
    // Determine sorting based on the sort query parameter
    let sortOption = {};
    if (sort === "asc") {
      sortOption = { createdAt: 1 }; // Sort by date ascending
    } else if (sort === "desc") {
      sortOption = { createdAt: -1 }; // Sort by date descending
    } else if (sort === "price-asc") {
      sortOption = { price: 1 }; // Sort by price ascending
    } else if (sort === "price-desc") {
      sortOption = { price: -1 }; // Sort by price descending
    }

    // Fetch newNewAds with the constructed query and sorting options
    const newNewAdsQuery = NewAd.find(query)
      .sort(sortOption)
      .skip(size * (page - 1))
      .limit(parseInt(size));

    let newNewAds = [];
    newNewAds = await newNewAdsQuery;

    // Count total newNewAds based on the filters
    const count = await NewAd.countDocuments(query);
    res.status(200).json({ ads: newNewAds, count });
  } catch (error) {
    next(error);
  }
};

const getNewAdById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newNewAd = await NewAd.findById(id);

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
    const { newNewAdsId } = req.query;

    if (!newNewAdsId) {
      return res.status(400).json({ message: "No newNewAd IDs provided" });
    }
    const newNewAdIdsArray = newNewAdsId
      .split(",")
      .map((id) => mongoose.Types.ObjectId(id));

    const newNewAds = await NewAd.find({ _id: { $in: newNewAdIdsArray } });

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
    const { category, newNewAdId, price } = req.query;
    const minPrice = 0.7 * price;
    const maxPrice = 1.3 * price;
    const newNewAdsQuery = NewAd.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
      category: category,
      active: true,
      sold: false,
    });

    const result = [];

    try {
      const documents = await newNewAdsQuery.limit(8).exec();
      for (const d of documents) {
        if (d._id == newNewAdId) continue;

        result.push(d);
      }
      res.status(200).send(result);
    } catch (error) {
      res.status(500).json({
        message: "Fetching newNewAds failed!" + error,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createNewAd = async (req, res, next) => {
  try {
    const newNewAd = new NewAd(req.body);
    await newNewAd.save();
    res.status(201).json(newNewAd);
  } catch (error) {
    next(error);
  }
};

const updateNewAd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    await NewAd.findByIdAndUpdate(id, updateData, { new: true });
    const newNewAd = await NewAd.findById(id);
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
    const { id } = req.params;
    const newNewAd = await NewAd.findByIdAndDelete(id);

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
    const { brand, model, sort } = req.query;
    const query = {};
    if (brand) {
      query.brand = brand;
    }
    if (model) {
      query.model = model;
    }

    let sortOption = { price: 1 };

    if (sort === "price-desc") {
      sortOption = { price: -1 };
    }

    // Fetch the ads filtered by brand and sorted by price
    const adsQuery = NewAd.find(query).sort(sortOption);

    const ads = await adsQuery;

    // Group ads by model, and collect their versions
    const groupedAds = ads.reduce((acc, ad) => {
      const existingModel = acc.find((item) => item.model === ad.model);
      const version = {
        _id: ad._id,
        price: ad.price,
        version: ad.version,
        category: ad.category,
        fuel_type: ad.fuel_type,
        seats: ad.seats,
        horsepower: ad.horsepower,
        power_kw: ad.power_kw,
        autonomy_wltp_km: ad.autonomy_wltp_km,
        technical_sheet: ad.technical_sheet,
        preview: ad.preview,
        photos: ad.photos,
        promo: ad.promo,
        new: ad.new,
      };

      if (existingModel) {
        // If model already exists, push the new version to the versions array
        existingModel.versions.push(version);
      } else {
        // If model does not exist, create a new entry
        acc.push({
          brand: ad.brand,
          model: ad.model,
          versions: [version],
        });
      }
      return acc;
    }, []);

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
