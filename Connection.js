require('dotenv').config();
const Sequelize = require('sequelize');
const pg = require('pg');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_NAME;
const user = process.env.DB_USERNAME;
console.log("NODE_ENV is:", process.env.NODE_ENV);


console.info('Connecting to database', {host, port, name, user});
console.info('Using DB password from .env in Connection.js', process.env.DB_PASSWORD);

console.log('Username from .env: ', process.env.DB_USERNAME);
console.log('Database password from .env: ', process.env.DB_PASSWORD);


const sequelize = new Sequelize(name, user, process.env.DB_PASSWORD, {
  host,
  dialect: 'postgres',
  dialectModule: pg,
  port,
  dialectOptions: {
    connectTimeout: 60000,
  },
  logging: console.log, 
});

// Add proper error handling
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit if DB connection fails
  });

module.exports.sequelize = sequelize;