const app = require('./index');
const { seed } = require('./db');

const { PORT = 4000 } = process.env;

app.listen(PORT, async () => {

  try {
    await seed();
    console.log(`Users are ready at http://localhost:${PORT}`);
  } catch (err) {
    console.error(err.message);
  }
});