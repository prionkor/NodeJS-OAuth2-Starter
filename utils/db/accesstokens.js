'use strict';

const jwt = require('jsonwebtoken');
const { AccessToken } = require('../../models');
const { Op } = require('sequelize');

/**
 * Returns an access token if it finds one, otherwise returns null if one is not found.
 * @param   {String}  token - The token to decode to get the id of the access token to find.
 * @returns {Promise} resolved with the token if found, otherwise resolved with undefined
 */
exports.find = async (token) => {
  try {
    const promise = await AccessToken.findOne({
      where: {
        jti: jwt.decode(token).jti,
      },
    });
    const data = promise ? promise.get() : undefined;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};

/**
 * Saves a access token, expiration date, user id, client id, and scope. Note: The actual full
 * access token is never saved.  Instead just the ID of the token is saved.  In case of a database
 * breach this prevents anyone from stealing the live tokens.
 * @param   {Object}  token          - The access token (required)
 * @param   {Date}    expirationDate - The expiration of the access token (required)
 * @param   {String}  userId         - The user ID (required)
 * @param   {String}  clientId       - The client ID (required)
 * @param   {String}  scope          - The scope (optional)
 * @returns {Promise} resolved with the saved token
 */
exports.save = (token, expirationDate, userId, clientId, scope) => {
  const { jti } = jwt.decode(token);
  const data = {
    jti,
    userId,
    expirationDate,
    clientId,
    scope,
  };
  AccessToken.build(data).save();
  return Promise.resolve(data);
};

/**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  token - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
exports.delete = async (token) => {
  try {
    const { jti } = jwt.decode(token);
    const token = await AccessToken.findOne({
      jti
    });
    const promise = token.destroy();
    return Promise.resolve(promise);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};

/**
 * Removes expired access tokens. It does this by looping through them all and then removing the
 * expired ones it finds.
 * @returns {Promise} resolved with an associative of tokens that were expired
 */
exports.removeExpired = () => {
  const promise = AccessToken.destroy({
    where: {
      expirationDate: {
        [Op.lt]: new Date()
      }
    }
  });
  return Promise.resolve(promise);
};

/**
 * Removes all access tokens.
 * @returns {Promise} resolved with all removed tokens returned
 */
exports.removeAll = () => {
  const promise = AccessToken.destroyAll();
  return Promise.resolve(promise);
};
