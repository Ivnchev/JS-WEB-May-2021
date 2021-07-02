const router = require('express').Router()


router.get('/', function (req, res, next) {
        res.render('home/home', {title: 'Home page'})
})


module.exports = router