const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.scope('withPassword').findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const passwordMatch = await user.isValidPassword(password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  req.session.regenerate( async (err) => {
    if (err) next(err)

    // store user information in session, typically a user id
    req.session.user = await User.findByPk(1)

    // save the session before redirection to ensure page
    // load does not happen before session is saved
    req.session.save(function (err) {
      if (err) return next(err)
      res.redirect('/')
    })
  })
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
});

module.exports = router;