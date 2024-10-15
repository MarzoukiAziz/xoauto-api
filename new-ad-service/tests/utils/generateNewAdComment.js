const { faker } = require("@faker-js/faker");

// Function to generate a single NewAdComment
const generateNewAdComment = () => {
  return {
    _id: faker.string.uuid(),
    uid: faker.string.uuid(),
    adId: faker.string.uuid(),
    content: faker.lorem.sentence(),
  };
};

// Function to generate an array of NewAdComments
const generateNewAdComments = (count = 1) => {
  return Array.from({ length: count }, generateNewAdComment);
};

module.exports = {
  generateNewAdComment,
  generateNewAdComments,
};
