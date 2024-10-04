const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("ArticleCategory", articleCategorySchema)
