const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XoAuto User API Swagger",
      version: "1.0.0",
      description: "API documentation for XoAuto API application.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5001}`,
      },
    ],
  },
  apis: [
    "./config/swagger/user-swagger.js",
    "./config/swagger/insights-swagger.js",
    "./config/swagger/cognito-swagger.js",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
