const { Model, DataTypes } = require('sequelize');
const { sequelize} = require('../util/db');

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: new Date().getFullYear()
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'blog',
  timestamps: true,
  underscored: true
});

module.exports = Blog;