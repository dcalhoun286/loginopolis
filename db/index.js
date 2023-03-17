const { User, Post } = require('./models');
const seed = require('./seedFn');
const { database } = require('./db');

module.exports = {
    User,
    Post,
    database,
    seed,
};
