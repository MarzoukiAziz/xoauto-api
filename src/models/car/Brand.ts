

import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:  { type: String, required: true },
    logo:  { type: String, required: true },
    adsCount: { type: Number, required: true }
})
const Brand = mongoose.model('Brand', brandSchema);

export default Brand;
