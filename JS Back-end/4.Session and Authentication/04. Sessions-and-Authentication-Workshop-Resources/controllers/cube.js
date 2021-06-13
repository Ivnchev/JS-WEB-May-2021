const router = require('express').Router()
const cubeService = require('../services/cubeService')

const guards = require('../middlewares/guards')

router.get('/create', guards.isAuth, function (req, res, next) {
    res.render('create')
})
router.post('/create', guards.isAuth, function (req, res, next) {
    const body = Object.entries(req.body)
        .reduce((a, b) => Object.assign(a, { [b[0]]: b[0] === 'difficultyLevel' ? Number(b[1]) : b[1] }), {})
    body.author = req.user._id
    cubeService.createCube(body)
        .then(() => res.redirect('/'))
        .catch(next)
})
router.get('/:id/details', function (req, res, next) {
    cubeService.getCube(req.params.id)
        .then(cube => {
            cube.isOwner = cube.author._id.toString() === req.user?._id
            res.render('details', { cube })
        })
        .catch(next)
})

router.get('/:id/edit', guards.isAuth, guards.isOwner, function (req, res, next) {
    cubeService.getCube(req.params.id)
        .then(cube => res.render('edit', cube))
        .catch(next)
})

router.post('/:id/edit', guards.isAuth, guards.isOwner, function (req, res, next) {
    const body = Object.entries(req.body)
        .reduce((a, b) => Object.assign(a, { [b[0]]: b[0] === 'difficultyLevel' ? Number(b[1]) : b[1] }), {})
    cubeService.updateOne(req.params.id, body)
        .then(() => res.redirect(`/cube/${req.params.id}/details`))
        .catch(next)
})

router.get('/:id/delete', guards.isAuth, guards.isOwner, function (req, res, next) {
    cubeService.getCube(req.params.id)
        .then(cube => res.render('delete', cube))
        .catch(next)
})


router.post('/:id/delete', guards.isAuth, guards.isOwner, function (req, res, next) {
    cubeService.deleteOne(req.params.id)
        .then(() => res.redirect('/'))
        .catch(next)
})






module.exports = router