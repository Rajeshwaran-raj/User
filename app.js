const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json());

const routes = require('./src/routes/index.js');

app.use('/', routes);

module.exports = app;
