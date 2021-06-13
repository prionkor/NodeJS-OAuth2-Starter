const host = process.env.DB_HOST || '127.0.0.1';
const dialect = 'mysql';
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
  },
  test: {
    username,
    password,
    database,
    host,
    dialect,
  },
  production: {
    username,
    password,
    database,
    host,
    dialect,
    dialectOptions: {
      socketPath: '/var/run/mysqld/mysqld.sock', // ubuntu
    },
  },
};
