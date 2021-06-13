'use strict';

//const User = require('../models/external/user');
const { User } = require('../../models');
/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   id - The unique id of the user to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.find = async id => {
  let user = await User.findByPk(id);
  if (!user) {
    user = null;
  }
  return Promise.resolve(user);
};

/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   username - The unique user name to find
 * @param   {Function} done     - The user if found, otherwise returns undefined
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.findByUsername = async username => {
  let user = await User.findOne({
    where: {
      username,
    },
  });

  if (!user) {
    user = null;
  }

  return Promise.resolve(user);
};

/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   username - The unique user name to find
 * @param   {Function} done     - The user if found, otherwise returns undefined
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.findByEmail = async email => {
  let user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    user = null;
  }

  return Promise.resolve(user);
};

exports.authCheck = async (username, password) => {
  let user = await User.authCheck(username, password);

  if (!user) {
    user = null;
  }

  return Promise.resolve(user);
};
