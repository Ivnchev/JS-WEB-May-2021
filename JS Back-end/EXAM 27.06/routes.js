const router = require('express').Router()

const home = require('./controllers/home.controller')
const auth = require('./controllers/auth.controller')
const trip = require('./controllers/trip.controller')
const user = require('./controllers/user.controller')

router.use('/', home)
router.use('/auth', auth)
router.use('/trip', trip)
router.use('/user', user)

router.all('*', function (req,res) {
    res.render('404', {title: '404 NOT FOUND'})
})

module.exports = router