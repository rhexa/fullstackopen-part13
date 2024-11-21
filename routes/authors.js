const express = require('express');
const router = express.Router();
const { Sequelize, Op } = require('sequelize');
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [Sequelize.fn('COUNT', '*'), 'articles'],
      [Sequelize.fn('SUM', Sequelize.cast(Sequelize.col('likes'), 'INTEGER')), 'likes'],
    ],
    group: ['author'],
    order: [[Sequelize.fn('SUM', Sequelize.cast(Sequelize.col('likes'), 'INTEGER')), 'DESC']],
  });

  res.json(authors);
});

module.exports = router;