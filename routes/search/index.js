const express = require('express')

const { Hashtag } = require('../../models')

const router = express.Router()

router.get('/:tag', async (req, res, next) => {
    const tag = req.params.tag
    try {
        const hashtag = await Hashtag.find({ where : { title:tag }})
        if(hashtag){
            const wikis = await hashtag.getWikis( {
                attributes : ['title', 'likes', 'dislikes']
            } )
            res.json({ data : wikis })
            return
        }
        res.json( { data : [] })
    } catch (error){
        console.error(error)
        next(error)
    }
})
module.exports = router