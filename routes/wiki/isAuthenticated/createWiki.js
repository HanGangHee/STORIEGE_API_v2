const { Wiki , Hashtag } = require('../../../models')


module.exports = async (req, res, next) => {
    const { title, content, parentId, tag } = req.body
    const userId = req.user.id
    try {
        const newWiki = await Wiki.create({
            userId,
            title,
            content,
            parentId
        })
        const hashtags = tag.match(/#[^\s]*/g)
        const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate(
                { where : { tag: tag.slice(1).toLowerCase() } }
            ) ))
        await newWiki.addHashtags(result.map(r => r[0]))
        res.json({ success : true })
    } catch(error) {
        console.error(error)
        next(error)
    }
}