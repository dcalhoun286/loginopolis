const { database } = require('../db');
const { DataTypes } = require('sequelize');

const User = database.define('users', {
  username: DataTypes.STRING,
  password: DataTypes.STRING
});

module.exports = { User };
