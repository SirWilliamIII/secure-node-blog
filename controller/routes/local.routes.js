// @localhost:3000/auth/local/<Route>
const Router = require('express').Router(),
      User   = require('../../model/user.model'),
      bcrypt = require('bcryptjs'),
      salt   = bcrypt.genSaltSync(10)

Router.post('/signup', (req, res) => {
	let errors                = [],
	    usernameAlreadyChosen = false,
	    usernameIsGood        = req.body.username.length > 0,
	    passwordIsGood        = req.body.password.length > 0,
	    emailIsGood           = req.body.email.length > 0

	if(!usernameIsGood) {
		errors.push('username field must be filled')
	}
	if(!passwordIsGood) {
		errors.push('password field must be filled')
	}
	if(!emailIsGood) {
		errors.push('email field must be filled')
	}

	User.findOne({ username: req.body.username })
		.then(user => {
			if(user) {
				usernameAlreadyChosen = true
				errors.push(`username: ${ req.body.username } is already in use`)
			} else {
				usernameAlreadyChosen = false
			}
		})
		.then(() => {
			if(errors.length > 0) {
				res.render('signup', { errors })
			} else {
				let newuser = new User
				newuser.username = req.body.username
				newuser.email = req.body.email
				newuser.password = bcrypt.hashSync(req.body.password, salt)
				newuser.profilePic = req.body.profilePic
				newuser.followers.push(req.body.username)
				newuser.peopleFollowing.push(req.body.username)
				newuser.save(user => {
					req.session.user = user
					res.redirect('/dashboard')
				})
			}
		})
})

module.exports = Router
