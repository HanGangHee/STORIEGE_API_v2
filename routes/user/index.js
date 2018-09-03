const express = require('express')

const { User } = require('../../models')
const { isLoggedIn } = require('../middleware')
const router = express.Router()


router.get('/user', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user.userId
        const exUser = await User.find( { where : { userId } })
        res.json(exUser)
    } catch (error){
        console.error(error)
        next(error)
    }
})



router.put('/user', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user.userId
        const { nick, age, sex, thema } = req.body
        const updateUser = await User.update({ nick, age, sex, thema }, { where : { userId } }, )
        res.json( { success : true } )
    } catch (error){
        console.error(error)
        next(error)
    }
})

router.delete('/user', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user.userId
        const deleteUser = await User.destroy( { where : { userId } })
        res.json( { success : true } )
    } catch (error){
        console.error(error)
        next(error)
    }
})



module.exports = router