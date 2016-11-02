var
  express = require('express'),
  inksRouter = express.Router(),
  passport = require('passport'),
  inksCtrl = require('../controllers/inks.js'),
  User = require('../models/User.js')

  inksRouter.route('/inks')
    .get(inksCtrl.index)
    .post(inksCtrl.create)

  inksRouter.route('/inks/:id')
    .get(inksCtrl.show)
    .patch(inksCtrl.update)
    .delete(inksCtrl.destroy)

  inksRouter.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username, instagram: req.body.instagram }), req.body.password, function(err, account) {
      if(err) {
        return res.status(500).json({
          err: err
        })
      }
      passport.authenticate('local')(req, res, function() {
        return res.status(200).json({
          status: 'Registration successful!'
        })
      })
    })
  })

  inksRouter.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if(err) {
        return next(err)
      }
      if(!user) {
        return res.status(401).json({
          err: info
        })
      }
      req.logIn(user, function(err) {
        if(err) {
          return res.status(500).json({
            err: 'Could not log in user'
          })
        }
        res.status(200).json({
          status: 'Login successful!',
          user: user
        })
      })
    })(req, res, next)
  })

  inksRouter.get('/logout', function(req, res) {
    req.logout()
    res.status(200).json({
      status: 'Bye!'
    })
  })

  inksRouter.get('/status', function(req, res) {
    if(!req.isAuthenticated()) {
      return res.status(200).json({
        status: false
      })
    }
    res.status(200).json({
      status: true,
      user: req.user
    })
  })

  inksRouter.get('/instagram-media', function(req, res) {
    request.get('https://www.instagram.com/' + req.query.instagram
    + '/media/', function(err, response, body) {
      res.json(JSON.parse(body))
    })
  })

module.exports = inksRouter
