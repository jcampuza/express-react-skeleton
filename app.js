require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methods = require('methods');
const session = require('express-session');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const methodOverride = require('method-override');

const config = require('./config/config');
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

// Express config defaults
app.use(helmet());
app.use(cors(config.cors));
app.use(session(config.session));
app.use(bodyParser.urlencoded(config.bodyParser.urlEncoded));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(__dirname + '/public/build'));

// error stack trace enhancement
if (!isProduction) {
	app.use(errorHandler());
}

// setup mongoose
mongoose.Promise = global.Promise;
if (isProduction) {
	console.log(mongoose);
}

// configure routes
require('./routes/index')(app, isProduction);

// Serve static assets in production
if (!isProduction) {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));
	})
}

// Configure errors
const configureErrors = require('./errorConfig')
configureErrors(app, isProduction);

// Start server
const server = app.listen(process.env.PORT || 3000, function() {
	console.log(`App listening on port ${server.address().port}`);
});