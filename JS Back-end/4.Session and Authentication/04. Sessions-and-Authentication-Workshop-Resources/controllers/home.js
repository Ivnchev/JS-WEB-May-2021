const cubeService = require('../services/cubeService')

const router = require('express').Router()


router.get('/', function (req, res, next) {
    const query = req.query
    const search = req.query
        ? { name: { $regex: query.search || '', $options: 'i' }, difficultyLevel: { $gte: query.from || 0, $lte: query.to || 6 } }
        : {}
    cubeService.getCubes(search)
        .then(x => res.render('index', { x, query }))
        .catch(next)
})



module.exports = router