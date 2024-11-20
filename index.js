require('dotenv').config()
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/blogs', require('./routes/blogs'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});