const bcrypt = require('bcrypt');

const express = require('express');
const loginRouter = express.Router();

const { User } = require('../db');

// POST /login

loginRouter.post('/', async (req, res, next) => {

    try {

        const { username, password } = req.body;
        const user = await User.findOne({ where: { username: username }});
        if (user !== null) {
            const passwordMatches = await bcrypt.compare(password, user.password);
            if (passwordMatches) {
            res.send(`successfully logged in user ${user.username}`);
            } else {
            res.status(401).send('incorrect username or password');
            }
        } else {
            res.status(401).send('incorrect username or password');
        }

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = loginRouter;
