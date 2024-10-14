const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email",
    ],
  },
  pro: { type: Boolean, default: false },
  avatar: { type: String, required: false },
});

new mongoose.model("User", userSchema);

const AdSchema = new mongoose.Schema(
  {
    uid: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    version: { type: String, required: false },
    category: { type: String, required: true },
    mileage: { type: Number, required: true, min: 0 },
    first_registration: {
      month: { type: Number, required: false },
      year: { type: Number, required: true },
    },
    fuel_type: { type: String, required: true },
    seats: { type: Number, required: false },
    color: { type: String, required: false },
    crit_air: { type: String, required: false },
    horsepower: { type: Number, required: false },
    power_kw: { type: Number, required: false },
    autonomy_wltp_km: { type: Number, required: false },
    equipments: {
      safety: {
        type: [String],
        default: [],
      },
      outdoor: {
        type: [String],
        default: [],
      },
      indoor: {
        type: [String],
        default: [],
      },
      functional: {
        type: [String],
        default: [],
      },
    },
    options_vehicule: {
      non_smoker: { type: Boolean, default: false },
      first_hand: { type: Boolean, default: false },
      manufacturer_warranty: { type: Boolean, default: false },
      others: [{ type: String }],
    },
    photos: [{ type: String, required: true }],
    interior_video: { type: String, required: false },
    exterior_video: { type: String, required: false },
    address: { type: String, required: false },
    region: { type: String, required: false },
    phone_number: { type: String, required: false },
    mask_phone: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    pro: { type: Boolean, default: false },
    sold: { type: Boolean, default: false },
    views: { type: Number, required: false },
  },
  { timestamps: true }
);

AdSchema.index({ uid: 1 });
AdSchema.index({ price: 1 });
AdSchema.index({ brand: 1, model: 1 });
const Ad = mongoose.model("Ad", AdSchema);

module.exports = Ad;
