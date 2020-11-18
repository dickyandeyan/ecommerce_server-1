'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addConstraint('Carts', {
       fields: ['ProductId'],
       type: 'foreign key',
       name: 'fk-product-to-cart',
       references: {
         table: `Products`,
         field: `id`
       },
       onDelete: 'CASCADE',
       onUpdate: 'CASCADE'
     })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Carts', 'fk-product-to-cart')
  }
};
