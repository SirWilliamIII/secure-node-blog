const Router = require('express').Router()

Router.get('/', (req, res) => {
	if(!req.session.user) {
		res.redirect('/signup')
	}
})

Router.get('/signup', (req, res) => {
	res.render('signup', { errors: [] })
})


module.exports = Router
