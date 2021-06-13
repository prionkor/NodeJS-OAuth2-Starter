const expressMySQLSession = require('express-mysql-session');

const createMySQLSessionStore = session => {
	const MySQLSessionStore = expressMySQLSession(session);
	const options = {
		host: process.env.DB_HOST,
		port: 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	};

	return new MySQLSessionStore(options);
};

module.exports = createMySQLSessionStore;
