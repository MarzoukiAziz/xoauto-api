const Comment = require('../models/Comment');
const User = require("../models/User");

// Create a new comment
const createComment = async (req, res, next) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
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
        const comments = await Comment.find({ articleId }).sort({ createdDate: -1 });;
        const userPromises = comments.map(async (comment) => {
            const user = await User.findById(comment.uid);
            return { ...comment.toObject(), user }; // Add the user to the comment object
        });

        const commentsWithUsers = await Promise.all(userPromises);
        res.status(200).json(commentsWithUsers);
    } catch (error) {
        next(error);
    }
};

module.exports = { createComment, updateComment, deleteComment, getCommentsByArticleId }
