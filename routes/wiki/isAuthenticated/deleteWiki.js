const { Wiki, WikiHashtag } = require('../../../models')


module.exports = async (req, res, next) => {
    try {
        const userId = req.user
        const wikiId = req.params.num
        const wiki = await Wiki.find( { where : { id : wikiId } })
        if(wiki === null || wiki.userId !== req.user){
            res.json( { message : "권한이 없습니다." } )
            return
        }
        const wikis = await Wiki.findAll( {
            attributed: ['id', 'parentId'],
            where : { userId }
        })
        let wikiGroup = new Map()
        wikis.forEach(row => { wikiGroup.set(row.id, row.parentId )})
        let deleteGroup = []
        wikiGroup.forEach(
            (v, k) => {
                let curNum = k
                while(curNum != 0){
                    if(curNum == wikiId){
                        deleteGroup.push(k)
                        break
                    }
                    curNum = wikiGroup.get(curNum)
                }
            }
        )
        console.log(wikiGroup)
        console.log(deleteGroup)
        await Wiki.destroy( { where : { id : deleteGroup} } )
        await WikiHashtag.destroy( { where : { wikiId : deleteGroup }})
        res.json( { success:true } )
    } catch(error) {
        console.error(error)
        next(error)
    }
}