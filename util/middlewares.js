const { ValidationError } = require('sequelize');

const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  if (error instanceof ValidationError) return res.status(400).json({ message: error.message });
  
  res.status(500).json({ message: 'Internal Server Error' });
  next(error);
};

module.exports = { errorMiddleware };