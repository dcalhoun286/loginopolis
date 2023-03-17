const express = require('express');
const usersRouter = express.Router();
const { User, Post } = require('../db');

// GET /users

usersRouter.get('/', async (req, res, next) => {
    try {
        const allUsers = await User.findAll({
            include: { model: Post }
        });
        res.send(allUsers);
    } catch (err) {
        console.error(err);
    }
});

module.exports = usersRouter;
