var
  User = require('../models/User.js'),
  Ink = require('../models/Ink.js')

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}

function index(req, res) {
  Ink.find({}, function(err, inks) {
    if(err) return console.log(err)
    res.json(inks)
  })
}

function show(req, res) {
  Ink.findById(req.params.id, function(err, ink) {
    if(err) return console.log(err)
    res.json(ink)
  })
}

function create(req, res) {
  User.findOne({_id: req.user._id}, function(err, user) {
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

}

function update(req, res) {
  Ink.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, ink) {
    if(err) console.log(err)
    res.json({success: true, message: "Ink updated!", ink: ink})
  })
}

function destroy(req, res) {
  Ink.findByIdAndRemove(req.params.id, function(err) {
    if(err) return console.log(err)
    res.json({success: true, message: "Ink deleted!"})
  })
}
