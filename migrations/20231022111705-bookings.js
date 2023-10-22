'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      booking_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      time_of_booking: {
        type: Sequelize.DATE,
        allowNull: false
      },
      bill: {
        type: Sequelize.DECIMAL(10, 2)
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'customer_id'
        }
      },
      club_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clubs',
          key: 'club_id'
        }
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
    await queryInterface.dropTable('Bookings');
  }
};
