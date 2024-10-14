const NewAd = require("../models/NewAd");
const mongoose = require("mongoose");

const getNewAds = async (req, res, next) => {
  try {
    const {
      size = 9,
      page = 1,
      sort = "price-asc",
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

    const query = {};

    if (brand) query.brand = { $in: brand };
    if (model) query.model = { $in: model };
    if (category) query.category = { $in: category };
    if (fuel_type) query.fuel_type = { $in: fuel_type };
    if (seats) query.seats = { $in: seats };
    if (priceMin || priceMax) query.price = { $gte: priceMin, $lte: priceMax };
    if (autonomyMin || autonomyMax)
      query.autonomy_wltp_km = { $gte: autonomyMin, $lte: autonomyMax };

    let sortOption = { price: 1 };
    if (sort === "price-desc") {
      sortOption = { price: -1 };
    }

    const newNewAds = await NewAd.find(query).sort(sortOption);

    const groupedAds = newNewAds.reduce((acc, ad) => {
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
        existingModel.versions.push(version);
      } else {
        acc.push({
          brand: ad.brand,
          model: ad.model,
          versions: [version],
        });
      }
      return acc;
    }, []);

    const totalCount = groupedAds.length;

    const paginatedAds = groupedAds.slice((page - 1) * size, page * size);

    res.status(200).json({ models: paginatedAds, count: totalCount });
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
    const { versionsIds } = req.query;

    if (!versionsIds) {
      return res.status(400).json({ message: "No versionsIds provided" });
    }
    const newNewAdIdsArray = versionsIds
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
    const { category, model, price } = req.query;
    const minPrice = 0.7 * price;
    const maxPrice = 1.3 * price;

    const newNewAdsQuery = NewAd.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
      category: category,
      model: { $ne: model },
    });

    try {
      const documents = await newNewAdsQuery.exec();
      const result = [];

      for (const d of documents) {
        const version = {
          _id: d._id,
          price: d.price,
          version: d.version,
          preview: d.preview,
        };

        const existingModel = result.find((item) => item.model === d.model);

        if (existingModel) {
          existingModel.versions.push(version);
        } else {
          result.push({
            brand: d.brand,
            model: d.model,
            versions: [version],
          });
        }
      }

      const limitedResults = result.slice(0, 8);
      res.status(200).json({ ads: limitedResults });
    } catch (error) {
      res.status(500).json({
        message: "Fetching newNewAds failed! " + error,
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

    const adsQuery = NewAd.find(query).sort(sortOption);

    const ads = await adsQuery;

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
        existingModel.versions.push(version);
      } else {
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
