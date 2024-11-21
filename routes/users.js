const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  console.log(req.body)
  await User.create(req.body);
  const user = await User.findOne({ where: { username: req.body.username } });
  res.json(user);
});

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.put('/:username', async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await user.update(req.body);
  res.json(user);
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.scope('withPassword').findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({
    message: "login success",
  });
});

module.exports = router;