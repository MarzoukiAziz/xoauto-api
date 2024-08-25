const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'XoAuto API Swagger',
            version: '1.0.0',
            description: 'API documentation for XoAuto API application.',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
            },
        ],
    },
    apis: ['./config/swagger.js'], // Path to your API files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerUi,
    swaggerDocs,
};
