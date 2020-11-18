'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The 'models/index' file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: 'Minimum quantity is 1'
        },
        notEmpty: {
          msg: 'Quantity is required'
        }
      }
    },
    total_price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};