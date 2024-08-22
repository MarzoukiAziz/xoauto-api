const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    articleId: {
        type: String,
        required: true

    },
    content: {
        type: String,
        required: true
    },
    answerTo: {
        type: String,
        required: false
    },
}, {
    timestamps: true,
});

module.exports = new mongoose.model("comment", commentSchema)
