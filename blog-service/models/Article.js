const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    content: {
        type: String
    },
    previewImg: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    readTime: {
        type: Number
    },
    tags: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
});

module.exports = new mongoose.model("Article", articleSchema)


