const Ad = require('../models/Ad');
const AdView = require('../models/AdView');
const mongoose = require('mongoose');

const getAds = async (req, res, next) => {
    try {
        const {
            size = 10,
            page = 1,
            sort = 'desc',
            includeViews = 'false'
        } = req.query;

        const adsQuery = Ad.find()
            .sort({ createdAt: sort === 'asc' ? 1 : -1 })
            .skip(size * (page - 1))
            .limit(parseInt(size));
        let ads = await adsQuery;

        if (includeViews === 'true') {
            const adIds = ads.map(ad => ad._id);

            const viewCounts = await AdView.aggregate([
                { $match: { adId: { $in: adIds } } },
                { $group: { _id: '$adId', viewCount: { $sum: 1 } } }
            ]);

            const viewCountMap = viewCounts.reduce((map, { _id, viewCount }) => {
                map[_id.toString()] = viewCount;
                return map;
            }, {});

            ads = ads.map(ad => ({
                ...ad.toObject(),
                views: viewCountMap[ad._id.toString()] || 0
            }));
        }
        const count = await Ad.countDocuments();

        res.status(200).json({ ads, count });
    } catch (error) {
        next(error);
    }
};

const getAdById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { view, includeViews } = req.query;

        const ad = await Ad.findById(id);

        if (!ad) {
            return res.status(404).json({ message: "Ad not found" });
        }

        if (view === "true") {
            const userId = req.user ? req.user.id : null;
            const viewerAgent = req.headers['user-agent'];

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

        if (includeViews === 'true') {

            const viewCount = await AdView.aggregate([
                { $match: { adId: mongoose.Types.ObjectId(id) } },
                { $group: { _id: '$adId', viewCount: { $sum: 1 } } }
            ]);

            ad.views = viewCount.length > 0 ? viewCount[0].viewCount : 0;
        }

        res.status(200).json(ad);
    } catch (error) {
        next(error);
    }
};

const getAdsByUserId = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const { includeViews } = req.query;

        const ads = await Ad.find({ uid: uid });

        if (includeViews === 'true') {
            const viewCounts = await AdView.aggregate([
                { $match: { adId: { $in: ads.map(ad => ad._id) } } },
                { $group: { _id: '$adId', viewCount: { $sum: 1 } } }
            ]);

            const adViewCounts = viewCounts.reduce((acc, view) => {
                acc[view._id.toString()] = view.viewCount;
                return acc;
            }, {});

            ads.forEach(ad => {
                ad.views = adViewCounts[ad._id.toString()] || 0;
            });
        }

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
    getAdsByUserId,
    getTodayAds,
    createAd,
    updateAd,
    deleteAd
};
