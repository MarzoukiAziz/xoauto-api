const NewAdComment = require("../models/NewAdComment");

// Create a new newAdComment
const createNewAdComment = async (req, res, next) => {
  try {
    const newAdComment = new NewAdComment(req.body);
    await newAdComment.save();

    const { versions } = req.query;
    const newAdComments = await NewAdComment.find({ adId: { $in: versions } })
      .populate({
        path: "uid",
        select: "name avatar",
      })
      .sort({
        createdAt: -1,
      });

    res.status(200).json(newAdComments);
  } catch (error) {
    next(error);
  }
};

// Update a newAdComment by newAdComment ID
const updateNewAdComment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedNewAdComment = await NewAdComment.findByIdAndUpdate(
      id,
      { $set: { content } },
      { new: true }
    );

    res.status(200).json(updatedNewAdComment);
  } catch (error) {
    next(error);
  }
};

// Delete a newAdComment by newAdComment ID
const deleteNewAdComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedNewAdComment = await NewAdComment.findByIdAndRemove(id);
    res.status(200).json(deletedNewAdComment);
  } catch (error) {
    next(error);
  }
};

// Get newAdComments by Model
const getNewAdCommentsByModel = async (req, res, next) => {
  const { versions } = req.query;

  try {
    const newAdComments = await NewAdComment.find({ adId: { $in: versions } })
      .populate({
        path: "uid",
        select: "name avatar",
      })
      .sort({
        createdAt: -1,
      });
    res.status(200).json(newAdComments);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewAdComment,
  updateNewAdComment,
  deleteNewAdComment,
  getNewAdCommentsByModel,
};
