const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      ejs = require('ejs'),
      passport = require('passport'),
      path = require('path')

const app = express()

/*  Require route files */
const baseRoutes = require('./controller/routes/base.routes'),
      userRoutes = require('./controller/routes/user.routes'),
      localRoutes = require('./controller/routes/local.routes'),
      articleRoutes = require('./controller/routes/article.routes'),
      fbRoutes = require('./controller/routes/fb.routes')

/*  Config and settings */
const key = require('./private/key'),
      db = key.db.remote || 'mongodb://localhost/' + key.db.local,
      port = process.env.PORT || 3000

/*  Connect to Mongoose, Mongoose connects to MongoDB */
mongoose.connect(db)

/*  Middlewares to  */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: key.session.secret }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', baseRoutes)
app.use('/auth/local', localRoutes)
app.use('/auth/facebook', fbRoutes)
app.use('/post', articleRoutes)
app.use('/user', userRoutes)

app.listen(port, err => {
	if(!err) {
		console.log(`Listening on port ${ port }`)
	} else {
		console.log('Error has occured', err)
	}
})
