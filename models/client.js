'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    clientId: DataTypes.STRING,
    clientSecret: DataTypes.STRING,
    trustedClient: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};