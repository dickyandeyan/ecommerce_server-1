'use strict'
const { Model } = require('sequelize')

const { encode } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart, { foreignKey: 'UserId' })
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            args: true,
            msg: 'Name is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Must be email format!',
          },
          notEmpty: {
            msg: 'Email is required',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Customer',
      },
      password: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            args: true,
            msg: 'Password is required',
          },
          len: {
            args: [6],
            msg: 'Password length minimum 6 character',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user) => {
          user.password = encode(user.password)
        },
      },
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
