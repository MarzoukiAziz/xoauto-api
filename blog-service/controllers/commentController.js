const Comment = require("../models/Comment");

// Create a new comment
const createComment = async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    const comments = await Comment.find({ articleId: comment.articleId })
      .populate({
        path: "uid",
        select: "name avatar",
      })
      .sort({
        createdAt: -1,
      });
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
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: { content } },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// Delete a comment by comment ID
const deleteComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndRemove(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    next(error);
  }
};

// Get comments by article ID
const getCommentsByArticleId = async (req, res, next) => {
  const { articleId } = req.params;

  try {
    const comments = await Comment.find({ articleId })
      .populate({
        path: "uid",
        select: "name avatar",
      })
      .sort({ createdAt: -1 });

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
