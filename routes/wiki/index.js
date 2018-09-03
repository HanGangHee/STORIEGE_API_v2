const express = require('express')

const { Wiki, User } = require('../../models')
const router= express.Router()

router.get('/wiki', async (req, res, next) => {
    try {
        const wikis = await Wiki.findAll({
            attributes : ['title', 'userId', 'likes', 'dislikes'],
            where : { parentId : 0 },
            order : ['likes', 'DESC'],
            limit : 10,
        })
        res.json({ data : wikis })
    } catch (error) {
        console.error(error)
        next(error)
    }
})

router.get('/wiki/:num', async (req, res, next) => {
    try {
        const num = req.params.num
        const wiki = await Wiki.find({ where : { id:num } })
        res.json({ data : wiki })
    } catch(error){
        console.error(error)
        next(error)
    }
})

module.exports = router