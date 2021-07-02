const { security: { cookie_name, secret } } = require('../config')
const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
    const token = req.cookies[cookie_name]
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                res.clearCookie(cookie_name)
                return next(err)
            }
            req.user = decoded
            res.locals.isLogged = true
            res.locals.email = req.user.email
        })
    }

    next()
}