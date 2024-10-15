const { faker } = require("@faker-js/faker");

// Function to generate a single mock article with random data
const generateMockArticle = () => ({
  title: faker.lorem.sentence(),
  subtitle: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(Math.floor(Math.random() * 3) + 1),
  previewImg: faker.string.uuid(),
  category: faker.word.noun(),
  readTime: faker.number.int(),
  tags: faker.lorem.words(Math.floor(Math.random() * 5) + 1),
  views: 10,
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
});

// Function to generate an array of mock articles
const generateMockArticles = (count = 10) => {
  return Array.from({ length: count }, () => generateMockArticle());
};

module.exports = {
  generateMockArticle,
  generateMockArticles,
};
