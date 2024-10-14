const mongoose = require("mongoose");

const NewAdSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true, min: 0 },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    version: { type: String, required: false },
    category: { type: String, required: true },
    fuel_type: { type: String, required: true },
    seats: { type: Number, required: false },
    horsepower: { type: Number, required: false },
    power_kw: { type: Number, required: false },
    autonomy_wltp_km: { type: Number, required: false },
    technical_sheet: {
      features: { type: Map },
      motor: { type: Map },
      transmission: { type: Map },
      dimensions: { type: Map },
      performance: { type: Map },
      consumption: { type: Map },
      safety_equipment: { type: Map },
      driving_aids: { type: Map },
      outdoor_equipment: { type: Map },
      multimedia: { type: Map },
      indoor_equipment: { type: Map },
      functional_equipment: { type: Map },
    },
    preview: { type: String, required: true },
    photos: [{ type: String, required: true }],
    promo: { type: Boolean, required: false },
    new: { type: Boolean, required: false },
  },
  { timestamps: true }
);

NewAdSchema.index({ price: 1 });
NewAdSchema.index({ brand: 1, model: 1 });
const NewAd = mongoose.model("NewAd", NewAdSchema);

module.exports = NewAd;
