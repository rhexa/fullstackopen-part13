const express = require('express');
const router = express.Router();
const { ReadingList } = require('../../models');
const { tokenExtractor } = require('../../util/middlewares');

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body;

  const readingList = await ReadingList.create({ blogId, userId });
  res.json(readingList);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const id = req.params.id;
  const readingList = await ReadingList.unscoped().findByPk(id);

  if (!readingList) {
    return res.status(404).json({ message: 'Reading list not found' });
  }

  if (readingList.userId !== req.decodedToken.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  readingList.read = req.body.read;
  await readingList.save();

  res.json({
    id: readingList.id,
    read: readingList.read
  });
});

module.exports = router;