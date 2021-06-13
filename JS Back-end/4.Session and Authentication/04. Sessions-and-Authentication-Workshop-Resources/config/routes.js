const router = require('express').Router()
const homeController = require('../controllers/home')
const cubeController = require('../controllers/cube')
const accessoryController = require('../controllers/accessory')
const authController = require('../controllers/auth')

router.use('/', homeController)
router.use('/cube', cubeController)
router.use('/accessory', accessoryController)

router.use('/auth', authController)

router.get('/about', (req, res) => res.render('about'))
router.get('*', (req, res) => res.render('404'))

module.exports = router