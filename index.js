const bcrypt = require('bcrypt');

const express = require('express');
const app = express();
const { User } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res, next) => {
  try {
    res.send('<h1>Welcome to Loginopolis!</h1><p>Log in via POST /login or register via POST /register</p>');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/users', async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    console.error(err);
  }
})

// POST /register

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPW = await bcrypt.hash(password, 7);
  const newUser = await User.create({ username, password: hashedPW });
  res.send(`successfully created user ${newUser.username}`);
});

// POST /login

app.post('/login', async (req, res) => {
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

module.exports = app;
