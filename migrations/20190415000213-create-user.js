'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true,
      },
      password: {
        type: Sequelize.STRING(80),
        allowNull: false,
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        required: true,
      },
      resetKey: {
        type: Sequelize.STRING,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    }),
  down: queryInterface => queryInterface.dropTable('Users'),
};
