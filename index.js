const bcrypt = require('bcrypt');

const express = require('express');
const app = express();
const { User, Post } = require('./db');

const indexRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/', indexRouter);

// the below GET /me route is not the proper authentication / authorization flow, just trying to get it to work for now.
// I accomplished this by sending in the request body with the content-type set to x-www-form-urlencoded
// this should actually incorporated into the flow of a POST /login request

// GET /me

app.get('/me', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ 
    where: { username: username },
    include: { model: Post }
  });
  if (user !== null) {
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
      res.send(user);
    } else {
      res.status(401).send('incorrect username or password');
    }
  } else {
    res.status(401).send('incorrect username or password');
  }
});

module.exports = app;
