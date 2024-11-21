const { ValidationError, ValidationErrorItem } = require('sequelize');

const errorMiddleware = (error, req, res, next) => {
  
  if (error instanceof ValidationError) {
    console.error('Validation error:', error.errors.map(e => e.message));
    return res.status(400).json({ message: error.errors.map(e => e.message) });
  };
  
  console.error(JSON.stringify(error, null, 2));
  res.status(500).json({ message: 'Internal Server Error' });
  next(error);
};

module.exports = { errorMiddleware };