require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT | 3000,
  AUTH_SECRET: process.env.AUTH_SECRET
}