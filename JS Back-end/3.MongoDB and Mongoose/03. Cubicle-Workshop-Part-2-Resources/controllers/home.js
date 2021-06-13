const cubeService = require('../services/cubeService')

const router = require('express').Router()


router.get('/', cubeService.getCubes)



module.exports = router