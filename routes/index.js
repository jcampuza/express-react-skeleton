const router = require('express').Router();

router.use('/api', (req, res, next) => {
	res.status(200).json({'success': true})
})

const configureRoutes = (app, isProduction = false) => {
	!isProduction && console.log('attached router');
	app.use(router);
}

module.exports = configureRoutes;