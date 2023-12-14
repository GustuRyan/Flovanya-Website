const { Sequelize } = require('sequelize');
require('dotenv').config();

const DBPASS = process.env.DBPASS;
const DBUSER = process.env.DBUSER;
const db = new Sequelize('peduli_bumi', DBUSER, DBPASS, {
  host: 'localhost',
  dialect: 'mysql',
});

db.authenticate()
  .then(() => {
    console.log('Connect to database successfully...');
  })
  .catch((err) => {
    console.error('Failed to connect to database...', err);
  });

module.exports = db;
