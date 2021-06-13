const jwt = require('jsonwebtoken')
const { COOKIE_NAME, SECRET } = require('../config/config')['development']

module.exports = function (req, res, next) {
    const token = req.cookies[COOKIE_NAME]
    if (token) {
        jwt.verify(token, SECRET, (err, decode) => {
            if (err) { res.clearCookie(COOKIE_NAME); next(err); return }
            req.user = decode
            res.locals.isLogged = true
            res.locals.username = req.user.username
        })
    }
    next()
}