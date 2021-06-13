'use strict';

const { Client } = require('../../models');

/**
 * Returns a client if it finds one, otherwise returns null if a client is not found.
 * @param   {String}   id   - The unique id of the client to find
 * @returns {Promise}  resolved promise with the client if found, otherwise undefined
 */
exports.find = async (id) => {
  let client = await Client.findByPk(id);
  client = client ? client.get() : undefined;
  return Promise.resolve(client);
};

/**
 * Returns a client if it finds one, otherwise returns null if a client is not found.
 * @param   {String}   clientId - The unique client id of the client to find
 * @param   {Function} done     - The client if found, otherwise returns undefined
 * @returns {Promise} resolved promise with the client if found, otherwise undefined
 */
exports.findByClientId = async (clientId) => {
  let client = await Client.findOne({
    where: {
      clientId,
    },
  });
  client = client ? client.get() : undefined;
  return Promise.resolve(client);
};
