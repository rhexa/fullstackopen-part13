const express = require('express');
const router = express.Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error(error)
    res.status(400).json({ error });
  }
});

module.exports = router;