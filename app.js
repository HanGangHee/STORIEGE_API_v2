const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const logger = require('morgan')

require('dotenv').config()

const route = require('./routes')
const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.set('JWT_SECRET', process.env.JWT_SECRET)

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(flash())
app.use(logger('dev'))

app.use(route)

// 404 not found
app.use((req, res, next) => {
    const err = new Error('404 Not Found')
    req.status = 404
    next(err)
})
// 500 internal server error
app.use((err, req, res) => {
    req.locals.message = err.message
    req.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번 포트에서 대기 중입니다.`)
})

module.exports = app