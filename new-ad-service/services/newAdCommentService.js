const NewAdComment = require("../models/NewAdComment");

// Service to create a new NewAdComment
const createNewAdComment = async (commentData) => {
  const newAdComment = new NewAdComment(commentData);
  return await newAdComment.save();
};

// Service to get NewAdComments by ad IDs
const getNewAdCommentsByVersions = async (versions) => {
  return NewAdComment.find({ adId: { $in: versions } })
    .populate({
      path: "uid",
      select: "name avatar",
    })
    .sort({ createdAt: -1 });
};

// Service to update a NewAdComment by ID
const updateNewAdComment = async (id, content) => {
  return NewAdComment.findByIdAndUpdate(
    id,
    { $set: { content } },
    { new: true }
  );
};

// Service to delete a NewAdComment by ID
const deleteNewAdComment = async (id) => {
  return NewAdComment.findByIdAndRemove(id);
};

module.exports = {
  createNewAdComment,
  getNewAdCommentsByVersions,
  updateNewAdComment,
  deleteNewAdComment,
};
