const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating blog' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.destroy({ where: { id } });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

module.exports = router;