const Comment = require("../models/Comment");

const createComment = async (commentData) => {
  const comment = new Comment(commentData);
  await comment.save();
  const articleComments = getCommentsByArticleId(comment.articleId);
  return articleComments;
};

const updateComment = async (id, content) => {
  return Comment.findByIdAndUpdate(id, { $set: { content } }, { new: true });
};

const deleteComment = async (id) => {
  return Comment.findByIdAndRemove(id);
};

const getCommentsByArticleId = async (articleId) => {
  const comments = await Comment.find({ articleId })
    .populate({
      path: "uid",
      select: "name avatar",
    })
    .sort({ createdAt: -1 });
  return comments;
};

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByArticleId,
};
