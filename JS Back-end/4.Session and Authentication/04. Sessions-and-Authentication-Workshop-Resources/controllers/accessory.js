const router = require('express').Router()
const accessoryService = require('../services/accessoryService')
const cubeService = require('../services/cubeService')

const guards = require('../middlewares/guards')


router.get('/create', guards.isAuth, (req, res, next) => res.render('create-accessory'))
router.post('/create', guards.isAuth, function (req, res, next) {
    const body = Object.entries(req.body).reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
    accessoryService.createOne(body)
        .then(() => res.redirect('/'))
        .catch(next)
})

router.get('/:id/attach', guards.isAuth, guards.isOwner, function (req, res, next) {
    Promise.all([
        cubeService.getCube(req.params.id),
        accessoryService.getAll(req.params.id)
    ]).then(([cube, accessories]) => {
        const acc = accessories.length === 0 ? false : accessories
        res.render('attach-accessory', { cube, acc })
    })

})
router.post('/:id/attach', guards.isAuth, guards.isOwner, function (req, res, next) {
    const cubeId = req.params.id
    const accessoryId = req.body.accessory
    Promise.all([
        cubeService.updateOne(cubeId, { $push: { accessories: accessoryId } }),
        accessoryService.updateOne(accessoryId, { $push: { cubes: cubeId } })
    ]).then(() => {
        res.redirect(`/cube/${cubeId}/details`)
    }).catch(next)
})


module.exports = router