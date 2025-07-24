const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swaggerOptions'); // <- Swagger config

// const { audit, setUserFromJWT, httpContext } = require('@dilligentech/middleware');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  },
}));

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// BELOW ORDER SHOULD NOT CHANGE
// app.use(httpContext.middleware);
// app.use(setUserFromJWT);
// app.use(audit);

const routes = require('./api/routes/index');
app.use('/', routes);
const SERVER_URL = process.env.SWAGGER_SERVER_URL;

console.info('Express application initialized. All routes are set up.');
console.info(`Swagger docs available at ${SERVER_URL}/api-docs`);

module.exports = app;