const express = require('express')
const router = express.Router()

const auth = require('./auth')
const search = require('./search')
const user = require('./user')
const wiki = require('./wiki')


router.get('/', (req, res, next) => {
    res.send("GET / NOW WORKING")
})
router.use('/auth', auth)
router.use('/search', search)
router.use('/user', user)
router.use('/wiki', wiki)



module.exports = router