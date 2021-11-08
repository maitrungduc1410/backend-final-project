const express = require('express')
const AuthController = require('../controllers/AuthController')
const router = express.Router()
const { isAuthenticated } = require('../middlewares/authenticated')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.get('/current-user', isAuthenticated, AuthController.getCurrentUser)

module.exports = router