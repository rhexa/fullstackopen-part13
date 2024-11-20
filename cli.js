const { QueryTypes } = require('sequelize');
const { sequelize, connectToDatabase } = require('./util/db')

const cli = async () => {
  try {
    await connectToDatabase()
    const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
    blogs.forEach(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`))
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

cli()