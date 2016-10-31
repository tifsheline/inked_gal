var
  express = require('express'),
  inksRouter = express.Router(),
  inksCtrl = require('../controllers/inks.js')

  inksRouter.route('/inks')
    .get(inksCtrl.index)
    .post(inksCtrl.create)

  inksRouter.route('/inks/:id')
    .get(inksCtrl.show)
    .patch(inksCtrl.update)
    .delete(inksCtrl.destroy)

module.exports = inksRouter
