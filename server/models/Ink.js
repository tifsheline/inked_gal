var
  mongoose = require('mongoose'),
  inkSchema = new mongoose.Schema({
    _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    category: String,
    area: String,
    artist: String,
    description: String,
    image: String
  }, {timestamps: true})

  var Ink = mongoose.model('Ink', inkSchema)
  module.exports = Ink
