const User = require('../models/User');
const Article = require('../models/Article');
const Ad = require('../models/Ad');
const AdView = require('../models/AdView');

const getStartOfLast30Days = () => {
    const today = new Date();
    return new Date(today.setDate(today.getDate() - 30));
};

const getDashboardHighlights = async (req, res, next) => {
    try {
        const startOfLast30Days = getStartOfLast30Days();
        // New users
        const newUsers = await User.countDocuments({
            createdAt: { $gte: startOfLast30Days }
        });

        // Active users in the last 30 days
        const activeUsersLast30Days = await User.countDocuments({
            lastLogin: { $gte: startOfLast30Days }
        });

        // New articles in the last 30 days
        const newArticlesLast30Days = await Article.countDocuments({
            createdAt: { $gte: startOfLast30Days }
        });

        // Views on articles in the last 30 days
        const articleViewsLast30Days = await Article.aggregate([
            { $match: { createdAt: { $gte: startOfLast30Days } } },
            { $group: { _id: null, totalViews: { $sum: '$views' } } }
        ]);

        // New ads in the last 30 days
        const newAdsLast30Days = await Ad.countDocuments({
            createdAt: { $gte: startOfLast30Days }
        });

        // Views on ads in the last 30 days
        const adViewsLast30Days = await AdView.aggregate([
            { $match: { viewedAt: { $gte: startOfLast30Days } } },
            { $group: { _id: null, totalViews: { $sum: 1 } } } // Counting each view as 1
        ]);

        res.status(200).json({
            newUsers,
            activeUsersLast30Days,
            newArticlesLast30Days,
            articleViewsLast30Days: articleViewsLast30Days[0]?.totalViews || 0,
            newAdsLast30Days,
            adViewsLast30Days: adViewsLast30Days[0]?.totalViews || 0
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardHighlights };
