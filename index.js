const express = require('express');
const app = express();
const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const { errorMiddleware, sessionMiddleware, sessionAuth } = require('./util/middlewares');
require('express-async-errors')

app.use(sessionMiddleware());
app.use(express.json());
app.use(require('./routes/'));
app.get('/', sessionAuth, (req, res) => {
  res.send('Welcome to fullstack open part 13!')  
});

app.use(errorMiddleware)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

start();