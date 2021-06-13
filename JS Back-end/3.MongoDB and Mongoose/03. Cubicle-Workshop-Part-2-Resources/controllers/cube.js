const router = require('express').Router()
const cubeService = require('../services/cubeService')


router.get('/create', cubeService.getCreate)
router.post('/create', cubeService.postCreate)
router.get('/:id/details', cubeService.getCube)




module.exports = router