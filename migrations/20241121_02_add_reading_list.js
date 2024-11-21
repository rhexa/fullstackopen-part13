const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('reading_list', {
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
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('reading_list')
  }
}