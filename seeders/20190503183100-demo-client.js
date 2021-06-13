'use strict';

module.exports = {
  up: queryInterface => {
    const clients = [
      {
        id: 1,
        name: 'Native App',
        clientId: '7o265JI7oT8l799J8M326dP63885dn9g',
        clientSecret:
          'W3r9tnFDZ6dPasTb5z4WmG5P75e6I145ZX29dQmXJZ59eG53s1m589UlcDX5W3YqR3s88hU7heA088BopdoKJu7D36v9TOop06oB',
        trustedClient: false,
      },
    ];

    return queryInterface.bulkInsert('Clients', clients, {
      ignoreDuplicates: true,
    });
  },

  down: queryInterface => queryInterface.bulkDelete('Clients', null, {}),
};
