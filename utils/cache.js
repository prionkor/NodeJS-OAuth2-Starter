const RedisCache = require('node-cache-redis');

const Cache = (ttl = 300) => {
  const options = {
    name: 'auth_redis',
    ttlInSeconds: ttl,
  };
  return new RedisCache(options);
};

module.exports = Cache;
