const { Wiki } = require('../../../models')

module.exports = async (req, res, next) => {
    const userId = req.user
    console.log("=============")
    console.log(userId)
    console.log("=============")
    try {
        const wikis = await Wiki.findAll({
            attributes : ['title', 'likes', 'dislikes'],
            where : { userId , parentId : 0 }
        })
        res.json({ data : wikis })
    } catch(error) {
        console.error(error)
        next(error)
    }
}