var
  express = require('express'),
  inksRouter = express.Router(),
  passport = require('passport'),
  inksCtrl = require('../controllers/inks.js'),
  User = require('../models/User.js'),
  Ink = require('../models/Ink.js')
  request = require('request')

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

  inksRouter.get('/users', function(req, res) {
    User.find({}).populate('inks').exec(function(err, users) {
      if(err) return console.log(err)
      res.json(users)
    })
  })

  inksRouter.get('/users/:id', function(req, res) {
    User.findById(req.params.id).populate('_by').exec(function(err, user) {
      if(err) return console.log(err)
      res.render(user)
    })
  })

  inksRouter.post('/users/:id/inks', function(req, res) {
    User.findById(req.params.id, function(err, user) {
      var newInk = new Ink(req.body)
      newInk._by = user
      newInk.save(function(err, ink) {
        if(err) return console.log(err)
        user.inks.push(ink)
        user.save(function(err) {
          res.json({success: true, message: "Ink created!", ink: ink})
        })
      })
    })
  })

  inksRouter.delete('/users/:userId/inks/:inksId', function(req, res) {
    User.findById(req.user._id, function(err, user) {
      if(err) return console.log(err)
      Ink.findOne({inkId: req.params.inkId, _by: req.user._id}, function(err, ink) {
        if(err) return console.log(err)
        user.update({$pull: {inks: ink._id}}, {new: true}, function(err, user) {
          if(err) console.log(err)
          ink.remove(function(err) {
            res.json({success: true, message: "Ink deleted...", user: user, deleteInk: req.params.inkId})
          })
        })
      })
    })
  })

module.exports = inksRouter
