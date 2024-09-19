const mongoose = require('mongoose');

const AdViewSchema = new mongoose.Schema({
    adId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ad', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    viewedAt: { type: Date, default: Date.now },
    viewerAgent: { type: String, required: false },
    location: {
        country: { type: String, required: false },
        city: { type: String, required: false }
    }
});

module.exports = new mongoose.model('AdView', AdViewSchema);
