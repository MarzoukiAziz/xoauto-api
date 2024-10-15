const NewAd = require("../models/NewAd");
const mongoose = require("mongoose");

// Service to get New Ads with query params
const getNewAds = async (queryParams) => {
  const { size = 9, page = 1, sort = "price-asc" } = queryParams;

  const query = buildQuery(queryParams);
  const sortOption = buildSortOption(sort);

  const newNewAds = await NewAd.find(query).sort(sortOption);
  const groupedAds = groupAdsByModel(newNewAds);

  const totalCount = groupedAds.length;
  const paginatedAds = groupedAds.slice((page - 1) * size, page * size);

  return { models: paginatedAds, count: totalCount };
};

// Service to get NewAd by ID
const getNewAdById = async (id) => {
  return NewAd.findById(id);
};

// Service to get NewAds by IDs
const getNewAdsByIds = async (versionsIds) => {
  const newNewAdIdsArray = versionsIds
    .split(",")
    .map((id) => mongoose.Types.ObjectId(id));

  return NewAd.find({ _id: { $in: newNewAdIdsArray } });
};

// Service to get Similar Ads
const getSimilars = async ({ category, model, price }) => {
  const minPrice = 0.7 * price;
  const maxPrice = 1.3 * price;

  const newNewAds = await NewAd.find({
    price: { $gte: minPrice, $lte: maxPrice },
    category,
    model: { $ne: model },
  }).exec();

  return groupAdsByModel(newNewAds).slice(0, 8);
};

// Service to create a NewAd
const createNewAd = async (adData) => {
  const newNewAd = new NewAd(adData);
  return newNewAd.save();
};

// Service to update a NewAd by ID
const updateNewAd = async (id, updateData) => {
  await NewAd.findByIdAndUpdate(id, updateData, { new: true });
  return NewAd.findById(id);
};

// Service to delete a NewAd by ID
const deleteNewAd = async (id) => {
  return NewAd.findByIdAndDelete(id);
};

// Service to get Ads by Brand
const getAdsByBrand = async (queryParams) => {
  const query = buildQuery(queryParams);
  const sortOption = buildSortOption(queryParams.sort);

  const ads = await NewAd.find(query).sort(sortOption);

  return groupAdsByModel(ads);
};

// Helper function to build queries
const buildQuery = ({
  brand,
  model,
  category,
  fuel_type,
  seats,
  priceMin,
  priceMax,
  autonomyMin,
  autonomyMax,
}) => {
  const query = {};
  if (brand) query.brand = { $in: brand };
  if (model) query.model = { $in: model };
  if (category) query.category = { $in: category };
  if (fuel_type) query.fuel_type = { $in: fuel_type };
  if (seats) query.seats = { $in: seats };
  if (priceMin || priceMax) query.price = { $gte: priceMin, $lte: priceMax };
  if (autonomyMin || autonomyMax)
    query.autonomy_wltp_km = { $gte: autonomyMin, $lte: autonomyMax };
  return query;
};

// Helper function to handle sorting logic
const buildSortOption = (sort) => {
  let sortOption = { price: 1 };
  if (sort === "price-desc") sortOption = { price: -1 };
  return sortOption;
};

// Helper function to group ads by model and create versions
const groupAdsByModel = (ads) => {
  return ads.reduce((acc, ad) => {
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
};

module.exports = {
  getNewAds,
  getNewAdById,
  getNewAdsByIds,
  getSimilars,
  createNewAd,
  updateNewAd,
  deleteNewAd,
  getAdsByBrand,
};
