const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XoAuto Blog API Swagger",
      version: "1.0.0",
      description: "API documentation for XoAuto Blog API.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5004}`,
      },
    ],
  },
  apis: [
    "./config/swagger/article-swagger.js",
    "./config/swagger/comment-swagger.js",
    "./config/swagger/article-category-swagger.js",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
