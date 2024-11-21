const { ValidationError, ValidationErrorItem } = require('sequelize');
const { JWT_SECRET } = require('./config');
const jwt = require('jsonwebtoken');

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
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch (error) {
      console.error(error)
      return res.status(401).json({ message: 'Invalid token' });      
    }
  } else {
    return res.status(401).json({ message: 'Token missing' });
  }
  next();
};

module.exports = { errorMiddleware, tokenExtractor };