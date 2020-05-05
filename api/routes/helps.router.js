const router = require('express').Router()

const {
  getHelps,
  createHelp,
  getHelpById,
  updateHelpById,
  deleteHelpById
} = require('../controllers/helps.controller')

router.get('/', getHelps)
router.get('/:id', getHelpById)
router.post('/', createHelp)
router.put('/:id', updateHelpById)
router.delete('/:id', deleteHelpById)

module.exports = router
