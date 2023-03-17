const app = require('./index');
const { seed } = require('./db');

require('dotenv').config();

const PORT = process.env.PORT | 4000;

app.listen(PORT, async () => {

  try {
    await seed();
    console.log(`Users are ready at http://localhost:${PORT}`);
  } catch (err) {
    console.error(err.message);
  }
});