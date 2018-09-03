
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

/*
 POST /auth/login
 data
 {
    userId
    pwd
 }

 */

module.exports = async (req, res, next) =>{
    const { userId, pwd } = req.body
    try {
        const exUser = await User.find( { where: { userId } })
        if(exUser){
             const comparePWD = await bcrypt.compare(pwd, exUser.pwd)
            if(comparePWD){
                 const token = jwt.sign({ user : exUser.id }, req.app.get('JWT_SECRET'), {
                     algorithm : 'HS256',
                     expiresIn : 60 * 60 * 24 * 7
                 })
                res.json( { token } )
            } else {
                res.json( { message: "이메일-비밀번호 조합이 일치하지 않습니다." } )
            }
        } else {
            res.json( { message: "이메일-비밀번호 조합이 일치하지 않습니다." } )
        }
    } catch(error) {
        console.error(error)
        next(error)
    }
}