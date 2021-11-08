const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const messageRoutes = require('./message')

router.use('/api/auth', authRoutes)
router.use('/api/messages', messageRoutes)

module.exports = router