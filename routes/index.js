const express = require('express');
const indexRouter = express.Router();
const usersRouter = require('./users');

indexRouter.use('/users', usersRouter);

// GET /
indexRouter.get('', async (req, res, next) => {
    try {
        res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = indexRouter;
