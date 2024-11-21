const express = require('express');
const router = express.Router();
const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middlewares');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const search = req.query.search;
  const where = {};

  if (search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${search}%`
        }
      },{
        author: {
          [Op.iLike]: `%${search}%`
        }
      }
    ]
  }

  // Done in exercise 10
  const blogs = await Blog.findAll({
    include: {
      model: User
    },
    where
  });
  res.json(blogs);
});

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({...req.body, userId: user.id});
  res.json(blog);
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }
  blog.likes = req.body.likes;
  await blog.save();
  res.json(blog);
});

router.delete('/:id', tokenExtractor, async (req, res) => {
  const id = req.params.id;
  const blog = await Blog.findByPk(id);
  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  if (blog.userId !== req.decodedToken.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  await blog.destroy();
  res.status(204).end();
});

module.exports = router;