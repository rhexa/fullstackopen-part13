const Blog = require('./blog')
const ReadingList = require('./readinglist')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })

module.exports = {
  Blog,
  User,
  ReadingList
}