const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XoAuto AD API Swagger",
      version: "1.0.0",
      description: "API documentation for XoAuto Ad API application.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5002}`,
      },
    ],
  },
  apis: [
    "./config/swagger/ad-swagger.js",
    "./config/swagger/ad-view-swagger.js",
    "./config/swagger/brand-swagger.js",
    "./config/swagger/category-swagger.js",
    "./config/swagger/color-swagger.js",
    "./config/swagger/energy-swagger.js",
    "./config/swagger/equipment-swagger.js",
    "./config/swagger/model-swagger.js",
    "./config/swagger/region-swagger.js",
    "./config/swagger/settings-swagger.js",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
