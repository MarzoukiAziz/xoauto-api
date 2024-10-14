const Article = require('../models/Article');
const Comment = require('../models/Comment');

// Get all articles
const getAllArticles = async (req, res, next) => {
    try {
        const {
            category,
            keywords,
            size,
            page,
            sort
        } = req.query;
        let query = {};
        if (category && keywords) {
            query = {
                category: category,
                $or: [
                    { title: { $regex: keywords, $options: 'i' } },
                    { content: { $regex: keywords, $options: 'i' } }
                ]
            };
        }

        else if (category) {
            query = { category: category };
        } else if (keywords) {
            query = {
                $or: [
                    { title: { $regex: keywords, $options: 'i' } },
                    { content: { $regex: keywords, $options: 'i' } }
                ]
            };
        }

        const articles = await Article.find(query)
            .sort({ createdAt: sort == "asc" ? 1 : -1 }) // Sort by most recent (descending order)
            .skip(size * (page - 1)).limit(size);
        const count = await Article.countDocuments(query);

        const articlesWithComments = await Promise.all(articles.map(async (article) => {
            const commentCount = await Comment.countDocuments({ articleId: article._id });
            return {
                ...article.toObject(),
                commentCount: commentCount
            };
        }));

        res.status(200).json({
            articles: articlesWithComments,
            count: count
        });

    } catch (error) {
        next(error);
    }
};

// Get article by ID
const getArticleById = async (req, res, next) => {
    try {
        const { id } = req.params
        const { view } = req.query
        const article = await Article.findById(id).exec();
        if (view == "true") {
            article.views = article.views + 1
            await article.save();
        }
        if (!article) {
            return res.status(404).json({
                message: "Article not found"
            });
        }
        res.status(200).json(article);
    }
    catch (error) {
        next(error);
    }
};
// Create a new article
const createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        next(error);
    }
};
// Update an article by ID
const updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};
// Delete an article by ID
const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle }
