'use strict';

const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../../models');

/**
 * Returns a refresh token if it finds one, otherwise returns null if one is not found.
 * @param   {String}  token - The token to decode to get the id of the refresh token to find.
 * @returns {Promise} resolved with the token
 */
exports.find = async (token) => {
  try {
    const promise = await RefreshToken.findOne({
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
 * Saves a refresh token, user id, client id, and scope. Note: The actual full refresh token is
 * never saved.  Instead just the ID of the token is saved.  In case of a database breach this
 * prevents anyone from stealing the live tokens.
 * @param   {Object}  token    - The refresh token (required)
 * @param   {String}  userId   - The user ID (required)
 * @param   {String}  clientId - The client ID (required)
 * @param   {String}  scope    - The scope (optional)
 * @returns {Promise} resolved with the saved token
 */
exports.save = (token, userId, clientId, scope) => {
  const { jti } = jwt.decode(token);
  const data = {
    jti,
    userId,
    clientId,
    scope,
  };
  RefreshToken.build(data).save();
  return Promise.resolve(data);
};

/**
 * Deletes a refresh token
 * @param   {String}  token - The token to decode to get the id of the refresh token to delete.
 * @returns {Promise} resolved with the deleted token
 */
exports.delete = (token) => {
  try {
    const id = jwt.decode(token).jti;
    const deletedToken = tokens[id];
    delete tokens[id];
    return Promise.resolve(deletedToken);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};

/**
 * Removes all refresh tokens.
 * @returns {Promise} resolved with all removed tokens returned
 */
exports.removeAll = () => {
  const promise = RefreshToken.destroyAll();
  return Promise.resolve(promise);
};
