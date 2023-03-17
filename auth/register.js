const bcrypt = require('bcrypt');

const express = require('express');
const registerRouter = express.Router();

const { User } = require('../db');

// POST /register

registerRouter.post('/', async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const hashedPW = await bcrypt.hash(password, 7);
        const newUser = await User.create({ username, password: hashedPW });
        res.send(`successfully created user ${newUser.username}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = registerRouter;
