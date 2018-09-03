const express = require('express')

const login = require('./login')
const join = require('./join')
const { isNotLoggedIn } = require('../middleware')
const router = express.Router()

router.post('/join', isNotLoggedIn, join)
router.post('/login', isNotLoggedIn, login)

module.exports = router