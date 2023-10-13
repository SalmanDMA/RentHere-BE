/* eslint-disable no-unused-vars */
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      carId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cars',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      bikeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Bikes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      start_date: {
        type: Sequelize.DATE,
      },
      rental_duration: {
        type: Sequelize.INTEGER,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      price_car: {
        type: Sequelize.INTEGER,
      },
      total_car: {
        type: Sequelize.INTEGER,
      },
      total_amount_car: {
        type: Sequelize.INTEGER,
      },
      price_bike: {
        type: Sequelize.INTEGER,
      },
      total_bike: {
        type: Sequelize.INTEGER,
      },
      total_amount_bike: {
        type: Sequelize.INTEGER,
      },
      total_cost: {
        type: Sequelize.INTEGER,
      },
      payment: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  },
};
