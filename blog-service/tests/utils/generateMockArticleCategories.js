const { faker } = require("@faker-js/faker");

// Function to generate mock categories with random names and unique IDs
const generateMockArticleCategories = (count = 2) => {
  return Array.from({ length: count }, () => ({
    _id: faker.string.uuid(),
    name: faker.word.noun(),
  }));
};

module.exports = {
  generateMockArticleCategories,
};
