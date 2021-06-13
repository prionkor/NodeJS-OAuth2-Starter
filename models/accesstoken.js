'use strict';

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    expirationDate: DataTypes.DATE,
    scope: DataTypes.STRING,
    jti: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    clientId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
  }, {
    timestamps: false,
  });

  AccessToken.associate = models => {
    // associations can be defined here
    AccessToken.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    AccessToken.belongsTo(models.Client, {
      foreignKey: 'clientId'
    });
  };

  return AccessToken;
};