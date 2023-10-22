'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      facility: {
        type:Sequelize.TEXT('long'),
        allowNull: true,
      },
      broadcast: {
        type: Sequelize.BOOLEAN
      },
      number_of_bookings: {
        type: Sequelize.INTEGER
      },
      total_spend: {
        type: Sequelize.DECIMAL(10, 2)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  }
};
