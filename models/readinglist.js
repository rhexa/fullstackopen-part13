// models/reading_list.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class ReadingList extends Model {}

ReadingList.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  blogId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'blogs',
      key: 'id',
    },
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'readinglist',
  underscored: true,
  timestamps: false,
});

module.exports = ReadingList;