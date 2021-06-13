'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AccessTokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(10).UNSIGNED,
    },
    jti: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    expirationDate: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    scope: {
      type: Sequelize.STRING,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    clientId: {
      allowNull: false,
      type: Sequelize.INTEGER(10).UNSIGNED,
      references: {
        model: 'Clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }).then(() => queryInterface.addIndex('AccessTokens', ['userId'])),
  down: queryInterface => queryInterface.dropTable('AccessTokens'),
};
