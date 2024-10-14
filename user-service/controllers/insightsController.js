const communicator = require("../../communicator");

const getDashboardHighlights = async (req, res, next) => {
  try {
    const { newUsers, activeUsersLast30Days } =
      await communicator.getUsersStats();

    const { newArticlesLast30Days, articleViewsLast30Days } =
      await communicator.getBlogStats();

    const { newAdsLast30Days, adViewsLast30Days } =
      await communicator.getAdStats();

    res.status(200).json({
      newUsers,
      activeUsersLast30Days,
      newArticlesLast30Days,
      articleViewsLast30Days: articleViewsLast30Days[0]?.totalViews || 0,
      newAdsLast30Days,
      adViewsLast30Days: adViewsLast30Days[0]?.totalViews || 0,
    });
  } catch (error) {
    next(error);
  }
};

const getUserHighlights = async (req, res, next) => {
  const { uid } = req.query;
  try {
    const savedCount = await communicator.getSavedAdsCount(uid);
    const adsCount = await communicator.getUserAdsCount(uid);

    res.status(200).json({
      savedCount,
      adsCount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserHighlights, getDashboardHighlights };
