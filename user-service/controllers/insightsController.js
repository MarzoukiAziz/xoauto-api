const {
  getDashboardHighlightsData,
  getUserHighlightsData,
} = require("../services/insightsService");

const getDashboardHighlights = async (req, res, next) => {
  try {
    const highlights = await getDashboardHighlightsData();
    res.status(200).json(highlights);
  } catch (error) {
    next(error);
  }
};

const getUserHighlights = async (req, res, next) => {
  const { uid } = req.query;
  try {
    const highlights = await getUserHighlightsData(uid);
    res.status(200).json(highlights);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardHighlights, getUserHighlights };
