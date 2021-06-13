'use strict';

const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('Updials@2021', salt);
    const users = [
      {
        id: 1,
        username: 'sisir',
        password,
        email: 'contact@sisir.me',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('Users', users, {
      ignoreDuplicates: true,
    });
  },

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
