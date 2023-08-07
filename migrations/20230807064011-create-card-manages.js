'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CardManages', {
      cardId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      columnId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Columns",
          key: "columnId",
        },
        onDelete: "CASCADE",
      },
      cardName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cardContent: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cardWorker: {
        allowNull: true,
        type: Sequelize.STRING
      },
      cardDeadline: {
        allowNull: true,
        type: Sequelize.DATE
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CardManages');
  }
};