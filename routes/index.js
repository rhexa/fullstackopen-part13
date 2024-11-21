const express = require('express');
const router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/users', require('./users'));
router.use('/authors', require('./authors'));
router.use('/readinglists', require('./reading_list'));
router.use('/auth', require('./authentication'));

module.exports = router;