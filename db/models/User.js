const { database } = require('../db');
const { DataTypes } = require('sequelize');

const User = database.define('users', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = { User };
