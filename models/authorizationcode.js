'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthorizationCode = sequelize.define('AuthorizationCode', {
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
        model: 'Clients',
        key: 'id'
      }
    },
    redirectURI: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  AuthorizationCode.associate = function(models) {
    // associations can be defined here
    AuthorizationCode.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    AuthorizationCode.belongsTo(models.Client, {
      foreignKey: 'clientId'
    });
  };
  return AuthorizationCode;
};