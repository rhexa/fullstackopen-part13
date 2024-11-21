const Blog = require('./blog')
const ReadingList = require('./reading_list')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })
User.belongsToMany(Blog, { through: ReadingList, as: 'blogs_to_read' })

module.exports = {
  Blog,
  User
}