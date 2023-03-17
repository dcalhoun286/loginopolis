const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');

const { User } = require('../db');

// POST /login

loginRouter.post('', async (req, res) => {
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
});

module.exports = loginRouter;
