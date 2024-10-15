const newAdCommentService = require("../services/newAdCommentService");

// Create a new NewAdComment
const createNewAdComment = async (req, res, next) => {
  try {
    const newAdComment = await newAdCommentService.createNewAdComment(req.body);
    const { versions } = req.query;
    const newAdComments = await newAdCommentService.getNewAdCommentsByVersions(
      versions
    );

    res.status(200).json(newAdComments);
  } catch (error) {
    next(error);
  }
};

// Update a NewAdComment by ID
const updateNewAdComment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updatedNewAdComment = await newAdCommentService.updateNewAdComment(
      id,
      content
    );
    res.status(200).json(updatedNewAdComment);
  } catch (error) {
    next(error);
  }
};

// Delete a NewAdComment by ID
const deleteNewAdComment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedNewAdComment = await newAdCommentService.deleteNewAdComment(
      id
    );
    res.status(200).json(deletedNewAdComment);
  } catch (error) {
    next(error);
  }
};

// Get NewAdComments by Model
const getNewAdCommentsByModel = async (req, res, next) => {
  const { versions } = req.query;

  try {
    const newAdComments = await newAdCommentService.getNewAdCommentsByVersions(
      versions
    );
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
