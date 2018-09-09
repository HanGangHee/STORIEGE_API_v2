const express = require('express')

const { User, Wiki, WikiHashtag } = require('../../models')
const { isLoggedIn } = require('../middleware')
const router = express.Router()


router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user
        const exUser = await User.find( { where : { id : userId } })
        res.json(exUser)
    } catch (error){
        console.error(error)
        next(error)
    }
})



router.put('/:id', isLoggedIn, async (req, res, next) => {
    try {
        if(req.params.id != req.user){
            res.json({ message : "권한이 없습니다. " })
            return
        }
        const userId = req.user
        const { nick, age, sex, thema } = req.body
        await User.update({ nick, age, sex, thema }, { where : { id : userId } } )
        res.json( { success : true } )
    } catch (error){
        console.error(error)
        next(error)
    }
})


router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        if(req.params.id != req.user){
            res.json({ message : "권한이 없습니다. " })
            return
        }
        await User.destroy( { where : { id : req.user } })
        const deleteWikis = await Wiki.destroy( { where : { userId : req.user }} )
        await WikiHashtag.destroy( { where : { wikiId : deleteWikis } })
        res.json( { success : true } )
    } catch (error){
        console.error(error)
        next(error)
    }
})


module.exports = router