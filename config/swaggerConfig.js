const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XoAuto API Swagger",
      version: "1.0.0",
      description: "API documentation for XoAuto API application.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: [
    "./config/swagger/user-swagger.js",
    "./config/swagger/ad-swagger.js",
    "./config/swagger/ad-view-swagger.js",
    "./config/swagger/article-swagger.js",
    "./config/swagger/comment-swagger.js",
    "./config/swagger/insights-swagger.js",
    "./config/swagger/article-category-swagger.js",
    "./config/swagger/cognito-swagger.js",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
