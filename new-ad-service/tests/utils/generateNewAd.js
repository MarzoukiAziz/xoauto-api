const { faker } = require("@faker-js/faker");
const mongoose = require("mongoose");

const generateNewAd = () => ({
  _id: mongoose.Types.ObjectId(),
  price: faker.number.int({ min: 10000, max: 1000000 }),
  brand: faker.word.noun(),
  modele: faker.word.noun(),
  version: faker.word.noun(),
  category: faker.word.noun(),
  fuel_type: "Électrique",
  seats: faker.number.int({ min: 2, max: 7 }),
  horsepower: faker.number.int({ min: 100, max: 400 }),
  power_kw: faker.number.int({ min: 10, max: 300 }),
  autonomy_wltp_km: faker.number.int({ min: 10, max: 800 }),
  technical_sheet: {},
  preview: faker.image.avatar(),
  photos: [
    faker.image.avatar(),
    faker.image.avatar(),
    faker.image.avatar(),
    faker.image.avatar(),
  ],
  promo: faker.datatype.boolean(),
  new: faker.datatype.boolean(),
});

// New function to generate multiple ads
const generateNewAds = (count = 1) => {
  const ads = [];
  for (let i = 0; i < count; i++) {
    ads.push(generateNewAd());
  }
  return ads;
};

module.exports = {
  generateNewAd,
  generateNewAds,
};
