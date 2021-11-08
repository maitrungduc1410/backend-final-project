const express = require('express')
const MessageController = require('../controllers/MessageController')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/authenticated')

router.get('/', isAuthenticated, MessageController.getAllMessages)
router.post('/', isAuthenticated, MessageController.createNewMessage)
router.put('/:id', isAuthenticated, MessageController.updateMessage)
router.delete('/:id', isAuthenticated, MessageController.deleteMessage)

module.exports = router