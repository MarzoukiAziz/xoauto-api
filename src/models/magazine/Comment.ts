import mongoose from 'mongoose';

const articleCommentSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
    createdDate: {
        type: Date,
        required: true
    },
    answerTo: {
        type: String,
        required: false
    },
});

const ArticleComment = mongoose.model('ArticleComment', articleCommentSchema);

export default ArticleComment;
