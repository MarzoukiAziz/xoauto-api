const {
  fetchAllArticles,
  fetchStats,
  fetchArticleById,
  addArticle,
  editArticle,
  removeArticle,
} = require("../services/articleService");

// Get all articles
const getAllArticles = async (req, res, next) => {
  try {
    const { category, keywords, size, page, sort } = req.query;
    const { articles, count } = await fetchAllArticles(
      category,
      keywords,
      size,
      page,
      sort
    );

    res.status(200).json({
      articles,
      count,
    });
  } catch (error) {
    next(error);
  }
};

// Get stats
const getStats = async (req, res, next) => {
  try {
    const stats = await fetchStats();
    res.status(200).send(stats);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get article by ID
const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { view } = req.query;
    const article = await fetchArticleById(id, view);

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
      });
    }

    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Create a new article
const createArticle = async (req, res, next) => {
  try {
    const article = await addArticle(req.body);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
};

// Update an article by ID
const updateArticle = async (req, res, next) => {
  try {
    const article = await editArticle(req.params.id, req.body);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

// Delete an article by ID
const deleteArticle = async (req, res, next) => {
  try {
    const article = await removeArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArticles,
  getStats,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
