import mongoose from 'mongoose';

const finitionSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    model:  { type: String, required: true },
    brand:  { type: String, required: true }
});

const Finition = mongoose.model('Finition', finitionSchema);

export default Finition;