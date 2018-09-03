const express = require('express')

const { User, Wiki } = require('../../models')
const { isLoggedIn } = require('../middleware')
const router = express.Router()


router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.user.id
        const exUser = await User.find( { where : { id : userId } })
        res.json(exUser)
    } catch (error){
        console.error(error)
        next(error)
    }
})



router.put('/:id', isLoggedIn, async (req, res, next) => {
    try {
        if(req.params.id != req.user.id){
            res.json({ message : "권한이 없습니다. " })
            return
        }
        const userId = req.user.id
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
        if(req.params.id != req.user.id){
            res.json({ message : "권한이 없습니다. " })
            return
        }
        const deleteUser = await User.destroy( { where : { id : req.user.id } })
        const deleteWiki = await deleteUser.removeWikis()
        await deleteWiki.removeHashtags()
        res.json( { success : true } )
    } catch (error){
        console.error(error)
        next(error)
    }
})



module.exports = router