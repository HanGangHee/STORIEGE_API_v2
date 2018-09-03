const { Wiki } = require('../../../models')


module.exports = async (req, res, next) => {
    try {
        const wikiId = req.params.num
        const wiki = await Wiki.find( { where : { id : wikiId } })
        if(wiki.userId !== req.user.id){
            res.json( { message : "권한이 없습니다." } )
            return
        }
        const deleteWiki = await Wiki.destroy( { where : { id : wikiId } } )
        await deleteWiki.removeHashtags()
        res.json( { success:true } )
    } catch(error) {
        console.error(error)
        next(error)
    }
}