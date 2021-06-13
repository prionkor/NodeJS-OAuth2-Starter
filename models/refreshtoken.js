'use strict';
module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('RefreshToken', {
    jti: DataTypes.STRING,
    scope: DataTypes.STRING,
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
        model: 'Users',
        key: 'id'
      }
    },
  }, {
    timestamps: false,
  });

  RefreshToken.associate = function(models) {
    // associations can be defined here
    RefreshToken.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    RefreshToken.belongsTo(models.Client, {
      foreignKey: 'clientId'
    });
  };
  return RefreshToken;
};