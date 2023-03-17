const {sequelize} = require('./');
const bcrypt = require('bcrypt');

const {User} = require('./');
const users = require('./seedData');
const seed = async () => {

  try {
    await sequelize.sync({ force: true }); // recreate db
    await Promise.all([
      users.forEach( async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 7);
        await User.create({ username: user.username, password: hashedPassword });
      })
    ]);

  } catch (err) {
    console.error(err.message);
  }
};

module.exports = seed;
