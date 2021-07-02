const router = require('express').Router()
const { security: { cookie_name } } = require('../config')

const guards = require('../middlewares/guards')



router.get('/login', function (req, res, next) { res.render('user/login', { title: 'Login Page' }) })
router.get('/register', function (req, res, next) { res.render('user/register', { title: 'Register Page'})} )

router.post('/login', function (req, res, next) {
    const { email, password } = req.body

    req.services.auth.login(email, password)
        .then(token => {
            res.cookie(cookie_name, token)
            res.redirect('/')
        }).catch(err => {
            err.view = 'user/login'
            next(err)
        })
})

router.post('/register', function (req, res, next) {
    const { email, password, rePassword, gender } = req.body

    try{
        if (password !== rePassword) {
            throw { errors: [{ message: 'Passwords don\'t match !', status: 204 }] }
        }

    }catch(err) {
        res.render('user/register', err)
    }

    req.services.auth.register(email, password, gender)
        .then(token => {
            res.cookie(cookie_name, token)
            res.redirect('/')
        }).catch(err => {
            err.view = 'user/register'
            next(err)
        })
})

router.get('/logout', guards.isLogged, function (req, res, next) {
    req.services.auth.logout(res)
    res.redirect('/')
})

module.exports = router