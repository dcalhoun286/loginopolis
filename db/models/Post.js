const { database } = require('../db');
const { DataTypes } = require('sequelize');

const Post = database.define('posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
});

module.exports = { Post };
