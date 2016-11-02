//dependencies
var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  expressSession = require('express-session'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  hash = require('bcrypt-nodejs'),
  path = require('path'),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  apiRoutes = require('./routes/inks.js'),
  PORT = process.env.port || 3000

//mongoose connection
mongoose.connect('mongodb://localhost/inkedgal', function(err) {
  console.log(err || "Connected to MongoDB!")
})

//user model
var User = require('./models/User.js')

//middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

//routes required
app.use('/api', apiRoutes)

app.use('/user/', apiRoutes)

app.get('*', function(req, res) {
  res.sendFile('/client/index.html', {root: './'})
})

//error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res) {
  res.status(err.status || 500)
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }))
})

app.listen(PORT, function(err) {
  console.log(err || "Server running of port " + PORT)
})
