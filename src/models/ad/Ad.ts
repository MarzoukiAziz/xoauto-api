import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  uid: { type: String, required: true },
  createdDate: {
    type: Date,
    required: true,
  },
  updatedAt: { type: Date, required: false },
  deleted: { type: Boolean, required: false },
  status: { type: String, required: false },
  views: { type: Number, required: false },
  sellerType: { type: String, required: false },
  //the car
  brand: { type: String, required: true },
  model: { type: String, required: true },
  version: { type: String, required: false },
  //age
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  km: { type: Number, required: true },
  //price
  sellType: { type: String, required: true },
  price: { type: Number, required: false },
  leasingAssignment: { type: Number, required: false },
  leasingRent: { type: Number, required: false },
  leasingMonths: { type: Number, required: false },

  //adresse
  address: { type: String, required: true },
  gouvernorat: { type: String, required: true },
  delegation: { type: String, required: true },

  //Technical characteristics
  body: { type: String, required: true },
  energy: { type: String, required: true },
  color: { type: String, required: true },
  places: { type: Number, required: true },

  //pictures
  imgs: [{ type: String }],
  video: { type: String, required: false },
  description: { type: String, required: false },
});

const Ad = mongoose.model("Ad", adSchema);

export default Ad;
