//user model
var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
  username: String,
  password: String,
  instagram: String,
  inks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ink'}]})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('users', User)
