const AdComment = require("../models/AdComment");
const User = require("../models/User");

// Create a new adComment
const createAdComment = async (req, res, next) => {
  try {
    const adComment = new AdComment(req.body);
    await adComment.save();

    const { versions } = req.query;
    const adComments = await AdComment.find({ adId: { $in: versions } }).sort({
      createdAt: -1,
    });
    const userPromises = adComments.map(async (adComment) => {
      const user = await User.findById(adComment.uid);
      return { ...adComment.toObject(), user };
    });

    const adCommentsWithUsers = await Promise.all(userPromises);
    res.status(200).json(adCommentsWithUsers);
  } catch (error) {
    next(error);
  }
};

// Update a adComment by adComment ID
const updateAdComment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedAdComment = await AdComment.findByIdAndUpdate(
      id,
      { $set: { content } },
      { new: true }
    );

    res.status(200).json(updatedAdComment);
  } catch (error) {
    next(error);
  }
};

// Delete a adComment by adComment ID
const deleteAdComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedAdComment = await AdComment.findByIdAndRemove(id);
    res.status(200).json(deletedAdComment);
  } catch (error) {
    next(error);
  }
};

// Get adComments by Model
const getAdCommentsByModel = async (req, res, next) => {
  const { versions } = req.query;

  try {
    const adComments = await AdComment.find({ adId: { $in: versions } }).sort({
      createdAt: -1,
    });
    const userPromises = adComments.map(async (adComment) => {
      const user = await User.findById(adComment.uid);
      return { ...adComment.toObject(), user };
    });

    const adCommentsWithUsers = await Promise.all(userPromises);
    res.status(200).json(adCommentsWithUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdComment,
  updateAdComment,
  deleteAdComment,
  getAdCommentsByModel,
};
