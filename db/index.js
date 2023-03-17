const { User } = require('./User');
const seed = require('./seedFn');
const { database } = require('./db');

module.exports = {
    User,
    database,
    seed,
};
