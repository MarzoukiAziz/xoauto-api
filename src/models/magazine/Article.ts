import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
    createdDate: {
        type: Date,
        required: true
    },
    previewImg: {
        type: String,
        required: true
    },
    categorie: {
        type: String
    },
    readTime: {
        type: Number
    },
    tags: {
        type: String
    }
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
