const router = require('express').Router()
const authService = require('../services/authService')
const { SECRET, COOKIE_NAME } = require('../config/config')['development']

router.get('/login', function (req, res, next) {
    res.render('user-pages/login')
})
router.get('/register', function (req, res, next) {
    res.render('user-pages/register')
})
router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    authService.login(username, password)
        .then(token => {
            res.cookie(COOKIE_NAME, token, { httpOnly: true })
            res.redirect('/')
        }).catch(next)
})
router.post('/register', function (req, res, next) {
    const { username, password, repeatPassword } = req.body
    if (password !== repeatPassword) {
        res.render('user-pages/register', { error: 'Passwords don\'t match!' })
    }
    authService.register(username, password)
        .then(() => {
            res.redirect('/auth/login')
        }).catch(next)
})

router.get('/logout', function (req, res, next) {
    if (req.cookies[COOKIE_NAME]) {
        res.clearCookie(COOKIE_NAME)
    }
    res.redirect('/')
})


module.exports = router
