const express = require('express')

const { isLoggedIn } = require('../middleware')
const { Wiki, User } = require('../../models')
const readWiki = require('./isAuthenticated/readWiki')
const createWiki = require('./isAuthenticated/createWiki')
const { updateContent, updateTitle, updateLike, updateParent} = require('./isAuthenticated/updateWiki')
const deleteWiki = require('./isAuthenticated/readWiki')

const router= express.Router()

router.get('/', async (req, res, next) => {
    try {
        const wikis = await Wiki.findAll({
            include : [{
                    attributes : ['userId', 'nick'],
                    model : User,
                }],
            attributes : ['title', 'likes', 'dislikes'],
            where : { parentId : 0 },
            order : [['likes', 'DESC']],
            limit : 10,
        })
        res.json({ data : wikis })
    } catch (error) {
        console.error(error)
        next(error)
    }
})
router.get('/:num', async (req, res, next) => {
    try {
        const wikiId = req.params.num
        const wiki = await Wiki.find({ where : { id : wikiId } })
        if(wiki){
             const subWikis = await Wiki.findAll({
                attributes : ['title', 'likes', 'dislikes'],
                where : { parentId : wiki.id }
            })
            res.json({ data : wiki , sub : subWikis })
            return
        }
        res.json({ data : wiki , sub : [] })
    } catch(error){
        console.error(error)
        next(error)
    }
})
router.get('/user', isLoggedIn, readWiki)
router.post('/', isLoggedIn, createWiki)
router.delete('/:num', isLoggedIn, deleteWiki)

router.put('/title/:num', isLoggedIn, updateTitle)
router.put('/content/:num', isLoggedIn, updateContent)
router.put('/parent/:num', isLoggedIn, updateParent)
router.put('/like/:num', updateLike)

module.exports = router