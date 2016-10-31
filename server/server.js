var
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  apiRoutes = require('./routes/inks.js'),
  PORT = process.env.port || 3000

mongoose.connect('mongodb://localhost/inkedgal', function(err) {
  console.log(err || "Connected to MongoDB!")
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(express.static('client'))

app.use('/api', apiRoutes)

// app.get('*', function(req, res) {
//   res.sendFile('/client/index.html', {root: './'})
// })

app.listen(PORT, function(err) {
  console.log(err || "Server running of port " + PORT)
})
