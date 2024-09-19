const AdView = require('../models/AdView');

// Create a new Ad View
const createAdView = async (req, res, next) => {
    try {
        const adView = new AdView(req.body);
        await adView.save();
        res.status(201).json(adView);
    } catch (error) {
        next(error);
    }
};

// Get Views by Ad ID
const getViewsByAdId = async (req, res, next) => {
    try {
        const { adId } = req.params;
        const views = await AdView.find({ adId }).populate('userId', 'name email');
        res.status(200).json(views);
    } catch (error) {
        next(error);
    }
};

// Get Views by User ID
const getViewsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const views = await AdView.find({ userId }).populate('adId', 'title');
        res.status(200).json(views);
    } catch (error) {
        next(error);
    }
};

// Get All Ad Views
const getAllAdViews = async (req, res, next) => {
    try {
        const { startDate, endDate, viewerAgent, country, city } = req.query;

        // Build query object based on provided filters
        let query = {};

        // Filter by time range
        if (startDate || endDate) {
            query.viewedAt = {};
            if (startDate) {
                query.viewedAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.viewedAt.$lte = new Date(endDate);
            }
        }

        // Filter by viewer agent (user browser, device, etc.)
        if (viewerAgent) {
            query.viewerAgent = { $regex: viewerAgent, $options: 'i' }; // case-insensitive
        }

        // Filter by location (country and/or city)
        if (country || city) {
            query.location = {};
            if (country) {
                query['location.country'] = { $regex: country, $options: 'i' }; // case-insensitive
            }
            if (city) {
                query['location.city'] = { $regex: city, $options: 'i' }; // case-insensitive
            }
        }

        // Fetch ad views based on the query with a limit (default to 100 results)
        const adViews = await AdView.find(query);

        res.status(200).json(adViews);
    } catch (error) {
        next(error);
    }
};


// Delete an Ad View by ID
const deleteAdView = async (req, res, next) => {
    try {
        const { id } = req.params;
        const adView = await AdView.findByIdAndDelete(id);
        if (!adView) {
            return res.status(404).json({ message: "Ad view not found" });
        }
        res.status(200).json({ message: "Ad view deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = { createAdView, getViewsByAdId, getViewsByUserId, getAllAdViews, deleteAdView };
