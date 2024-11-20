const express = require('express');
const app = express();
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { errorMiddleware } = require('./util/middlewares');
require('express-async-errors')

app.use(express.json());
app.use('/api/blogs', require('./routes/blogs'));
app.use(errorMiddleware)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();