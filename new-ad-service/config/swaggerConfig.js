const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "XoAuto New Ad API Swagger",
      version: "1.0.0",
      description: "API documentation for XoAuto New Ad API application.",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5003}`,
      },
    ],
  },
  apis: [],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
