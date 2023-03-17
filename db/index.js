const { User } = require('./models');
const seed = require('./seedFn');
const { database } = require('./db');

module.exports = {
    User,
    database,
    seed,
};
