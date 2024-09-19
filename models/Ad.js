const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    title: { type: String, required: false },
    description: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['new', 'used'], required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    version: { type: String, required: false },
    category: { type: String, required: true },
    mileage: { type: Number, required: true, min: 0 },
    first_registration: {
        month: { type: Number, required: false },
        year: { type: Number, required: true }
    },
    fuel_type: { type: String, required: true },
    seats: { type: Number, required: false },
    color: { type: String, required: false },
    crit_air: { type: String, required: false },
    horsepower: { type: Number, required: false },
    power_kw: { type: Number, required: false },
    autonomy_wltp_km: { type: Number, required: false },
    options_vehicule: {
        heads_up_display: { type: Boolean, default: false },
        parking_assist: { type: Boolean, default: false },
        tow_hitch: { type: Boolean, default: false },
        roof_racks: { type: Boolean, default: false },
        bluetooth: { type: Boolean, default: false },
        rear_camera: { type: Boolean, default: false },
        automatic_climate_control: { type: Boolean, default: false },
        gps: { type: Boolean, default: false },
        non_smoker: { type: Boolean, default: false },
        first_hand: { type: Boolean, default: false },
        rear_radar: { type: Boolean, default: false },
        leather_seats: { type: Boolean, default: false },
        heated_seats: { type: Boolean, default: false },
        manufacturer_warranty: { type: Boolean, default: false },
        sound_system: { type: Boolean, default: false },
        sunroof: { type: Boolean, default: false },
        panoramic_roof: { type: Boolean, default: false },
        others: [{ type: String }]
    },
    courant: {
        AC: { type: String, required: false },
        DC: { type: String, required: false },
    },
    photos: [{ type: String, required: true }],
    interior_video: { type: String, required: false },
    exterior_video: { type: String, required: false },
    address: { type: String, required: false },
    phone_number: { type: String, required: false },
    mask_phone: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    views: { type: Number, required: false },
}, { timestamps: true });

AdSchema.index({ price: 1 });
AdSchema.index({ brand: 1, model: 1 });
const Ad = mongoose.model('Ad', AdSchema);

module.exports = Ad;
