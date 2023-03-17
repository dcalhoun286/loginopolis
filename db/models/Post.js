const { database } = require('../db');
const { DataTypes } = require('sequelize');

const Post = database.define('posts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = { Post };
