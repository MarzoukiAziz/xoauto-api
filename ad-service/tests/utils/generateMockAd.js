const { faker } = require("@faker-js/faker");
const Ad = require("../../models/Ad");
const mongoose = require("mongoose");

const generateMockAd = () => ({
  _id: mongoose.Types.ObjectId(),
  uid: faker.string.uuid(),
  title: faker.vehicle.vehicle(),
  description: faker.lorem.sentences(3),
  price: faker.number.int({ min: 10000, max: 400000 }),
  brand: faker.vehicle.manufacturer(),
  car_model: faker.vehicle.model(),
  category: faker.helpers.arrayElement(["SUV", "Sedan", "Hatchback", "Truck"]),
  mileage: faker.number.int({ min: 10000, max: 400000 }),
  first_registration: {
    year: faker.date.past(20).getFullYear(),
  },
  fuel_type: faker.helpers.arrayElement([
    "Petrol",
    "Diesel",
    "Electric",
    "Hybrid",
  ]),
  seats: faker.number.int({ min: 2, max: 7 }),
  color: faker.word.noun(),
  options_vehicule: faker.helpers.arrayElements(
    ["Parking Assist", "Sunroof", "Bluetooth", "Leather Seats"],
    2
  ),
  photos: [faker.image.avatar(), faker.image.avatar(), faker.image.avatar()],
  address: faker.word.noun(),
  phone_number: faker.phone.number(),
  interior_video: faker.internet.url(),
  exterior_video: faker.internet.url(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
});

const generateMockAds = (count = 10) => {
  const ads = [];
  for (let i = 0; i < count; i++) {
    const ad = generateMockAd();
    ads.push({ ...ad, toObject: () => ad });
  }
  return ads;
};

module.exports = {
  generateMockAd,
  generateMockAds,
};
