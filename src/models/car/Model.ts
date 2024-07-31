import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    brand: { type: String, required: true },
    name: { type: String, required: true },
});

const Model = mongoose.model('Model', modelSchema);

export default Model;