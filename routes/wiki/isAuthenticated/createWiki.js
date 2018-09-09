const { Wiki , Hashtag, User } = require('../../../models')


module.exports = async (req, res, next) => {
    const { title, content, parentId, tag } = req.body

    const userId = req.user
    try {
        const newWiki = await Wiki.create({
            title,
            content,
            parentId,
            userId
        })
        const hashtags = tag.match(/#[^\s]*/g)
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate(
                { where : { title: tag.slice(1).toLowerCase() } }
            ) ))
            await newWiki.addHashtags(result.map(r => r[0]))
        }
        res.json({ success : true })
    } catch(error) {
        console.error(error)
        next(error)
    }
}