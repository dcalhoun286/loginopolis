const { database } = require('./db');
const { Sequelize } = require('sequelize');

const User = database.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = { User };
