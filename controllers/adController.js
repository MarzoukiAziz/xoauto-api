const Ad = require('../models/Ad');

// Get all ads with optional filters (category, brand, sort, size, page)
const getAds = async (req, res, next) => {
    try {
        const {
            size = 10,    // Default size for pagination
            page = 1,     // Default page number for pagination
            sort = 'desc' // Default sorting order
        } = req.query;

        const ads = await Ad.find()
            .sort({ createdAt: sort === 'asc' ? 1 : -1 })
            .skip(size * (page - 1))
            .limit(parseInt(size));

        const count = await Ad.countDocuments();

        res.status(200).json({ ads, count });
    } catch (error) {
        next(error);
    }
};

const getAdById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findById(id);

        if (!ad) {
            return res.status(404).json({ message: "Ad not found" });
        }

        res.status(200).json(ad);
    } catch (error) {
        next(error);
    }
};

const getAdsByUserId = async (req, res, next) => {
    try {
        const { uid } = req.params;

        const ads = await Ad.find({ uid: uid });

        res.status(200).json(ads);
    } catch (error) {
        next(error);
    }
};

const getTodayAds = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const ads = await Ad.find({
            createdAt: { $gte: today }
        });

        res.status(200).json(ads);
    } catch (error) {
        next(error);
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
        const ad = await Ad.findByIdAndUpdate(id, req.body, { new: true });

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
    getAdsByUserId,
    getTodayAds,
    createAd,
    updateAd,
    deleteAd
};
