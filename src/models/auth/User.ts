import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: String,
    email: { type: String, required: true },
    phone: { type: String, required: false },
    displayName: { type: String, required: true },
    emailVerified: { type: Boolean, required: false },
    photoURL: { type: String, required: false },
    phoneNumberVerified: { type: Boolean, required: false },
    proSeller: { type: Boolean, required: false },
    favorites: [{ type: String }]
});

const User = mongoose.model('User', userSchema);

export default User;
