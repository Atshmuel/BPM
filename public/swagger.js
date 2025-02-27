const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blood Pressure Monitoring API',
      version: '1.0.2',
      description: 'API for tracking blood pressure measurements for patients',
    },
  },
  apis: ['./router/*.js', './middlewares/*.js'],
};

const specs = swaggerJsdoc(swaggerOptions);

module.exports = { specs }