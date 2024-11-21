const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');
const { JWT_SECRET } = require('../util/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User extends Model {
  static async encryptPassword (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  async isValidPassword(password) {
    return await bcrypt.compare(password, this.password);
  };

  async generateToken() {
    return new Promise((resolve, reject) => {
      jwt.sign({ id: this.id, username: this.username }, JWT_SECRET, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
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
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'user',
  timestamps: true,
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
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