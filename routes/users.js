const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Blog, ReadingList } = require('../models');

router.post('/', async (req, res) => {
  await User.create(req.body);
  const user = await User.findOne({ where: { username: req.body.username } });
  res.json(user);
});

router.get('/', async (req, res) => {
  // Done in exercise 10
  const users = await User.findAll({
    include: {
      model: Blog
    }
  });
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt'],
        },
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
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

module.exports = router;