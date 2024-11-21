const express = require('express');
const router = express.Router();

router.use('/blogs', require('./blogs'));
router.use('/users', require('./users'));
router.use('/auth', require('./authentication'));

module.exports = router;