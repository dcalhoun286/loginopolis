const { database } = require('./db');
const bcrypt = require('bcrypt');

const { User, Post } = require('./models');
const users = require('./seedData');

const seed = async () => {

  try {
    await database.sync({ force: true }); // recreate db
    await Promise.all([
      users.forEach( async (user) => {

        const hashedPassword = await bcrypt.hash(user.password, 7);

        const newUser = await User.create(
          { 
            username: user.username,
            password: hashedPassword
          }
        );

        if (user.posts?.length) {
          for (const post of user.posts) {
            const newPost = await Post.create(
              {
                title: post.title,
                content: post.content
              }
            )

            await newUser.addPost(newPost);
          }
        }

      })
    ]);

  } catch (err) {
    console.error(err.message);
  }
};

module.exports = seed;
