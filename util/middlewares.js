const { ValidationError } = require('sequelize');
const jwt = require('jsonwebtoken');
const { AUTH_SECRET } = require('./config');
const { sequelize } = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const User = require('../models/user');

const errorMiddleware = (error, req, res, next) => {
  
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.errors.map(e => e.message));
    return res.status(400).json({ message: error.errors.map(e => e.message) });
  };
  
  console.error(JSON.stringify(error, null, 2));
  res.status(500).json({ message: 'Internal Server Error' });
  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), AUTH_SECRET);
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Invalid token' });      
    }
  } else {
    return res.status(401).json({ message: 'Token missing' });
  }
  next();
};

const sessionMiddleware = () => session({
  secret: AUTH_SECRET,
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: false
})

const sessionAuth = async (req, res, next) => {
  const user = await User.findByPk(req.session.user.id);
  if (user && !user.disabled) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = { errorMiddleware, tokenExtractor, sessionMiddleware, sessionAuth };