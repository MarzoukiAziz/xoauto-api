const commentService = require("../services/commentService");

// Create a new comment
const createComment = async (req, res, next) => {
  try {
    const comments = await commentService.createComment(req.body);
    res.status(201).json(comments);
  } catch (error) {
    next(error);
  }
};

// Update a comment by comment ID
const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await commentService.updateComment(id, content);
    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// Delete a comment by comment ID
const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedComment = await commentService.deleteComment(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    next(error);
  }
};

// Get comments by article ID
const getCommentsByArticleId = async (req, res, next) => {
  const { articleId } = req.params;

  try {
    const comments = await commentService.getCommentsByArticleId(articleId);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByArticleId,
};
