// swaggerOptions.js
const SERVER_URL = process.env.SWAGGER_SERVER_URL || 'http://localhost:80';

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Deployment Management API',
      version: '1.0.0',
      description: 'API documentation for Deployment Management',
    },
    servers: [
      {
        url: SERVER_URL,
      },
    ],
  },
  apis: ['./api/routes/*.js'],
};
