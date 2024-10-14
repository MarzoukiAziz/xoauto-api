const { faker } = require("@faker-js/faker");

// Helper function to create a mock comment
const createMockComment = (articleId = "99") => ({
  _id: faker.string.uuid(),
  uid: faker.string.uuid(),
  articleId: articleId,
  content: faker.lorem.sentences(Math.floor(Math.random() * 3) + 1),
  answerTo: faker.string.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
});

// Function to generate multiple mock comments
const generateMockComments = (articleId, count = 10) => {
  return Array.from({ length: count }, () => createMockComment(articleId));
};

// Function to generate a single mock comment
const generateMockComment = (articleId) => createMockComment(articleId);

module.exports = {
  generateMockComments,
  generateMockComment,
};
