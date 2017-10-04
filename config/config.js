const path = require('path');
const _ = require('lodash');

const NODE_ENV = _.defaultTo(process.env.NODE_ENV, 'development');

const isProd = NODE_ENV === 'production';
const isTest = NODE_ENV === 'test';
const isDev = NODE_ENV === 'development';

module.exports = {
	env: {
		isProd,
		isTest,
		isDev,
	},

	cors: {
		origin: '*',
		exposeHeaders: ['Authorization'],
		credentials: true,
		allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
		allowHeaders: ['Authorization', 'Content-Type'],
		keepHeadersOnError: true,
	},

	session: { 
		secret: 'some-secret', 
		cookie: { maxAge: 60000 }, 
		resave: false, 
		saveUninitialized: false 
	},

	bodyParser: {
		urlEncoded: {
			extended: false
		}
	},

	secret: _.defaultTo(process.env.SECRET, 'secret'),
	jwtSecret: _.defaultTo(process.env.JWT_SECRET, 'secret'),

	jwtOptions: {
		expiresIn: '7d'
	}
}

function normalizePort(value) {
	const port = parseInt(value, 10);
	
	if (isNaN(port)) {
		return value;
	}

	if (port > 0) {
		return port;
	}

	return false;
}