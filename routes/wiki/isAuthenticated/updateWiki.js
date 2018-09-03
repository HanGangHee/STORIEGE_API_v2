const { Wiki, sequelize } = require('../../../models')

exports.updateTitle = async (req, res, next) => {
    const userId = req.user.id
    const wikiId = req.params.num
    const { title } = req.body
    try {
        const wiki = await Wiki.find({ where : { id : wikiId } })
        if(wiki.userId != userId){
            res.json({ message : "권한이 없습니다." })
            return
        }
        await Wiki.update( { title }, { where : { id : wikiId }})
        res.json({ success : true })
    } catch(error) {
        console.error(error)
        next(error)
    }
}


exports.updateContent = async (req, res, next) => {
    const userId = req.user.id
    const wikiId = req.params.num
    const { content } = req.body
    try {
        const wiki = await Wiki.find({ where : { id : wikiId } })
        if(wiki.userId != userId){
            res.json({ message : "권한이 없습니다." })
            return
        }
        await Wiki.update( { content }, { where : { id : wikiId }})
        res.json({ success : true })
    } catch(error) {
        console.error(error)
        next(error)
    }
}

exports.updateParent = async (req, res, next) => {
    const userId = req.user.id
    const wikiId = req.params.num
    const { parentId } = req.body
    try {
        const wiki = await Wiki.find({ where : { id : wikiId } })
        if(wiki.userId != userId){
            res.json({ message : "권한이 없습니다." })
            return
        }
        await Wiki.update( { parentId }, { where : { id : wikiId }})
        res.json({ success : true })
    } catch(error) {
        console.error(error)
        next(error)
    }
}

exports.updateLike = async (req, res, next) => {
    const userId = req.user.id
    const wikiId = req.params.num
    const { like } = req.body
    try {
        const wiki = await Wiki.find({ where : { id : wikiId } })
        if(wiki.userId != userId){
            res.json({ message : "권한이 없습니다." })
            return
        }
        if(like == 1){
            await Wiki.update( { likes : sequelize.literal('likes + 1') }, { where : { id : wikiId }})
        }
        else if(like == -1){
            await Wiki.update( { dislikes : sequelize.literal('dislikes + 1') }, { where : { id : wikiId }})
        }
        res.json({ success : true })
    } catch(error) {
        console.error(error)
        next(error)
    }
}