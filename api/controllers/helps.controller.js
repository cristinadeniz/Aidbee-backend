const HelpModel = require('../models/helps.model')
const { handleError } = require('../utils')

module.exports = {
  getHelps,
  getOtherUserHelps,
  createHelp,
  getHelpById,
  updateHelpById,
  deleteHelpById
}

function getHelps (req, res) {
  HelpModel
    .find({ requester: res.locals.user._id })
    .populate('requester')
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function getOtherUserHelps (req, res) {
  HelpModel
    .find({
      $and: [{ requester: { $ne: res.locals.user._id } }, { requestStatus: 'requested' }]
    })
    .populate('requester')
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function createHelp (req, res) {
  req.body = { requester: res.locals.user, ...req.body }
  HelpModel
    .create(req.body)
    .then((help) => {
      res.json(help)
    })
    .catch((err) => handleError(err, res))
}

function getHelpById (req, res) {
  HelpModel
    .findById(req.params.id)
    .then(help => res.json(help))
    .catch((err) => handleError(err, res))
}

function updateHelpById (req, res) {
  HelpModel
    .findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function deleteHelpById (req, res) {
  HelpModel
    .remove({ _id: req.params.id })
    .then(response => res.json(response))
    .catch(err => handleError(err, res))
}
