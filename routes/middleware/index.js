
const jwt = require('jsonwebtoken')

exports.isLoggedIn = (req, res, next) => {
    const token = req.authorization || req.headers['x-access-token'] || req.query.token
    if(token){
        const checkUser = new Promise(
            (resolve, reject) => {
                jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                    if(err) reject(err)
                    resolve(decoded)
                })
            })
        const respond = (decoded) => {
            req.user = decoded.user;
            next()
        }
        const onError = (error) => {
            next(error)
        }
        checkUser
            .then(respond)
            .catch(onError)
    } else {
        res.status(403).json({ message: "로그인 필요" })
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    const token = req.authorization || req.headers['x-access-token'] || req.query.token
    if(!token){
        next()
    } else {
        res.redirect('/')
    }
}