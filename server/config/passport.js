var
  passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())

// used to deserialize the user
passport.deserializeUser(function(username, done) {
    User.findOne({username: username}).populate('inks').exec(function(err, user) {
        done(err, user);
    });
});

module.exports = passport
