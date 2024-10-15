const Article = require("../models/Article");
const Comment = require("../models/Comment");

const fetchAllArticles = async (category, keywords, size, page, sort) => {
  let query = {};
  if (category && keywords) {
    query = {
      category: category,
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { content: { $regex: keywords, $options: "i" } },
      ],
    };
  } else if (category) {
    query = { category: category };
  } else if (keywords) {
    query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { content: { $regex: keywords, $options: "i" } },
      ],
    };
  }

  const articles = await Article.find(query)
    .sort({ createdAt: sort === "asc" ? 1 : -1 })
    .skip(size * (page - 1))
    .limit(size);
  const count = await Article.countDocuments(query);

  const articlesWithComments = await Promise.all(
    articles.map(async (article) => {
      const commentCount = await Comment.countDocuments({
        articleId: article._id,
      });
      return {
        _id: article._id,
        title: article.title,
        subtitle: article.subtitle,
        content: article.content,
        previewImg: article.previewImg,
        category: article.category,
        views: article.views,
        readTime: article.readTime,
        tags: article.tags,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        commentCount: commentCount,
      };
    })
  );

  return { articles: articlesWithComments, count };
};

const addArticle = async (articleData) => {
  const article = new Article(articleData);
  return await article.save();
};

const editArticle = async (id, articleData) => {
  return Article.findByIdAndUpdate(id, articleData, {
    new: true,
  });
};

const removeArticle = async (id) => {
  return Article.findByIdAndDelete(id);
};

const fetchArticleById = async (id, view) => {
  const article = await Article.findById(id);
  if (article && view === "true") {
    article.views = article.views + 1;
    await article.save();
  }
  return article;
};

const fetchStats = async () => {
  const startOfLast30Days = getStartOfLast30Days();

  // New articles in the last 30 days
  const newArticlesLast30Days = await Article.countDocuments({
    createdAt: { $gte: startOfLast30Days },
  });

  // Views on articles in the last 30 days
  const articlesViewsLast30Days = await Article.aggregate([
    { $match: { createdAt: { $gte: startOfLast30Days } } },
    { $group: { _id: null, totalViews: { $sum: "$views" } } },
  ]);
  let articleViewsLast30Days = 0;

  if (articlesViewsLast30Days.length) {
    articleViewsLast30Days = articlesViewsLast30Days[0].totalViews;
  }

  return { newArticlesLast30Days, articleViewsLast30Days };
};

const getStartOfLast30Days = () => {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - 30));
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  addArticle,
  editArticle,
  removeArticle,
  fetchStats,
  getStartOfLast30Days,
};
