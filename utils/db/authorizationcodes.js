'use strict';

const jwt = require('jsonwebtoken');
const { AuthorizationCode } = require('../../models');

/**
 * Returns an authorization code if it finds one, otherwise returns null if one is not found.
 * @param   {String}  token - The token to decode to get the id of the authorization token to find.
 * @returns {Promise} resolved with the authorization code if found, otherwise undefined
 */
exports.find = async (token) => {
  try {
    const code = await AuthorizationCode.findOne({
      where: {
        jti: jwt.decode(token).jti,
      },
    });

    if(code) {
      code = code.get();
      delete code.jti;
    }else{
      code = undefined;
    }
    
    return Promise.resolve(code);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};


/**
 * Saves a authorization code, client id, redirect uri, user id, and scope. Note: The actual full
 * authorization token is never saved.  Instead just the ID of the token is saved.  In case of a
 * database breach this prevents anyone from stealing the live tokens.
 * @param   {String}  code        - The authorization code (required)
 * @param   {String}  clientId    - The client ID (required)
 * @param   {String}  redirectURI - The redirect URI of where to send access tokens once exchanged
 * @param   {String}  userId      - The user ID (required)
 * @param   {String}  scope       - The scope (optional)
 * @returns {Promise} resolved with the saved token
 */
exports.save = (code, clientId, redirectURI, userId, scope) => {
  const { jti } = jwt.decode(code);
  const data = {
    jti,
    clientId,
    redirectURI,
    userId,
    scope,
  };
  AuthorizationCode.build(data).save();
  return Promise.resolve(data);
};

/**
 * Deletes an authorization code
 * @param   {String}  token - The authorization code to delete
 * @returns {Promise} resolved with the deleted value
 */
exports.delete = async (token) => {
  try {
    const { jti } = jwt.decode(token);
    const token = await AuthorizationCode.findOne({
      jti
    });
    const promise = token.destroy();
    return Promise.resolve(promise);
  } catch (error) {
    return Promise.resolve(undefined);
  }
};

/**
 * Removes all authorization codes.
 * @returns {Promise} resolved with all removed authorization codes returned
 */
exports.removeAll = () => {
  const promise = AuthorizationCode.destroyAll();
  return Promise.resolve(promise);
};
