const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.scope('withPassword').findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const passwordMatch = await user.isValidPassword(password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = await user.generateToken();

  res.json({
    token,
    username: user.username,
    name: user.name
  });
});

module.exports = router;