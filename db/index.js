const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');
const seed = require('./seedFn');

module.exports = {
    User,
    sequelize,
    Sequelize,
    seed
};
