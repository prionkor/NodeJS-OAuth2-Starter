'use strict';

require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const config = require('./config');
const db = require('./utils/db');
const oauth2 = require('./utils/oauth2');
const client = require('./utils/client');
const site = require('./utils/site');
const token = require('./utils/token');
const user = require('./utils/user');

// utils
const createMySQLSessionStore = require('./utils/mySQLSessionStore');

// Express configuration
const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());

// Session Configuration
app.use(
	session({
		cookie: {
			maxAge: 30 * 60 * 1000, // 30 min by default
			secure: process.env.COOKIE_SECURE === 'true',
		},
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: false,
		store: createMySQLSessionStore(session),
	})
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./utils/passport');

app.get('/', site.index);
app.get('/login', site.loginForm);
app.post('/login', site.login);
app.get('/logout', site.logout);
app.get('/account', site.account);

app.get('/dialog/authorize', oauth2.authorization);
app.post('/dialog/authorize/decision', oauth2.decision);
app.post('/oauth/token', oauth2.token);

app.get('/api/userinfo', user.info);
app.get('/api/clientinfo', client.info); // need work

// Mimicking google's token info endpoint from
// https://developers.google.com/accounts/docs/OAuth2UserAgent#validatetoken
app.get('/api/tokeninfo', token.info);

// Mimicking google's token revoke endpoint from
// https://developers.google.com/identity/protocols/OAuth2WebServer
app.get('/api/revoke', token.revoke);

// static resources for stylesheets, images, javascript files
app.use(express.static(path.join(__dirname, 'public')));

// Catch all for error messages.  Instead of a stack
// trace, this will log the json of the error message
// to the browser and pass along the status with it
app.use((err, req, res, next) => {
  if (err) {
    if (err.status == null) {
      console.error('Internal unexpected error from:', err.stack);
      res.status(500);
      res.json(err);
    } else {
      res.status(err.status);
      res.json(err);
    }
  } else {
    next();
  }
});

// From time to time we need to clean up any expired tokens
// in the database
setInterval(() => {
  db.accessTokens
    .removeExpired()
    .catch(err =>
      console.error('Error trying to remove expired tokens:', err.stack)
    );
}, config.db.timeToCheckExpiredTokens * 1000);

module.exports = app;
