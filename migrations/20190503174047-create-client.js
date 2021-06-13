'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Clients', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    clientId: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    clientSecret: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    trustedClient: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
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
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  }),
  down: queryInterface => queryInterface.dropTable('Clients'),
};
