const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')


/*
POST /auth/join

data :
{
    userId
    pwd
    nick
    age
    sex
    thema
}

 */

module.exports = async (req, res, next) => {
    const { userId, pwd, nick, age, sex, thema } = req.body
    try {
        const exUser = await User.find( { where: { userId } })
        if(exUser){
            return res.json({ message : "이미 가입된 유저입니다." })
        }
        const hash = await bcrypt.hash(pwd, 12);
        await User.create({
            userId,
            pwd : hash,
            nick,
            age,
            sex,
            thema
        })
        res.json( { success:true })
    } catch(error){
        console.error(error)
        next(error)
    }


}