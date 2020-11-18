'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Cart, { foreignKey: 'ProductId' })
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            args: true,
            msg: 'Product name is required',
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,

        validate: {
          notEmpty: {
            args: true,
            msg: 'Image URL is required',
          },
          isUrl: {
            args: true,
            msg: 'Invalid URL format',
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,

        validate: {
          min: {
            args: [0],
            msg: 'Price must be greater than 0',
          },

          notEmpty: {
            args: true,
            msg: 'Price is required',
          },
          isInt: {
            args: true,
            msg: `Only can fill with number`,
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,

        validate: {
          min: {
            args: [0],
            msg: `Stock can't be less than 0`,
          },

          notEmpty: {
            args: true,
            msg: 'Stock is required',
          },

          isInt: {
            args: true,
            msg: `Only can fill with number`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  )
  return Product
}
