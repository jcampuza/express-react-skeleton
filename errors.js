const configureErrors = (app, isProduction = false) => {
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err.status = 404;
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