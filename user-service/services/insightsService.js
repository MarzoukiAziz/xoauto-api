const communicator = require("../../communicator");

// Service function for dashboard highlights
const getDashboardHighlightsData = async () => {
  const { newUsers, activeUsersLast30Days } =
    await communicator.getUsersStats();
  const { newArticlesLast30Days, articleViewsLast30Days } =
    await communicator.getBlogStats();
  const { newAdsLast30Days, adViewsLast30Days } =
    await communicator.getAdStats();

  return {
    newUsers,
    activeUsersLast30Days,
    newArticlesLast30Days,
    articleViewsLast30Days,
    newAdsLast30Days,
    adViewsLast30Days,
  };
};

// Service function for user highlights
const getUserHighlightsData = async (uid) => {
  const savedCount = await communicator.getSavedAdsCount(uid);
  const adsCount = await communicator.getUserAdsCount(uid);

  return { savedCount, adsCount };
};

module.exports = { getDashboardHighlightsData, getUserHighlightsData };
