const { ServerError } = require('./lib/errors');

const configureErrors = (app, isProduction = false) => {
	// If we get here there is a problem (should have matched * handler)
	app.use((req, res, next) => {
		const err = ServerError ('Not Found');
		err.status = 500;
		next(err);
	});
	
	// Development Error handling
	if (!isProduction) {
		app.use((err, req, res, next) => {
			// console.log(err.stack);
	
			res.status(err.status || 500);
			res.json({'errors': {
				message: err.message,
				error: err,
			}});
		})
	}
	
	// Prod error handler
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.json({'errors': {
			message: err.message,
			error: {}
		}})
	});
}

module.exports = configureErrors;