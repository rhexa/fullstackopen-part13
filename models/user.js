const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');
const bcrypt = require('bcrypt');

class User extends Model {
  static async encryptPassword (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  };
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  scopes: {
    withPassword: {
      attributes: {}
    }
  }
});

User.beforeValidate(async (user) => {
  if (user.password) {
    user.password = await User.encryptPassword(user.password);
  }
});

module.exports = User;