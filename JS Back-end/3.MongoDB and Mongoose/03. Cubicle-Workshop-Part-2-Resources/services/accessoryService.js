const cubeModel = require('../models/Cube')
const accessoryModel = require('../models/Accessory')
const controllers = require('../modules/controller-factory')
const accessoryControllers = controllers(accessoryModel)
const cubeControllers = controllers(cubeModel)
module.exports = {
    getCeateAccessory: function (req, res, next) { res.render('create-accessory') },
    postCreateAccessory: function (req, res, next) {
        const body = Object.entries(req.body).reduce((a, b) => Object.assign(a, { [b[0]]: b[1] }), {})
        accessoryControllers.createOne(body)
            .then(() => res.redirect('/'))
            .catch(next)
    },

    getAttachAccessory: function (req, res, next) {
        Promise.all([
            cubeControllers.getOneById(req.params.id).lean(),
            accessoryControllers.getAll({ cubes: { $nin: req.params.id } }).lean()
        ]).then(([cube, accessories]) => {
            const acc = accessories.length === 0 ? false : accessories
            res.render('attach-accessory', { cube, acc })
        })

    },
    postAttachAccessory: function (req, res, next) {
        const cubeId = req.params.id
        const accessoryId = req.body.accessory
        Promise.all([
            cubeControllers.updateOne(cubeId, { $push: { accessories: accessoryId } }),
            accessoryControllers.updateOne(accessoryId, { $push: { cubes: cubeId } })
        ]).then(() => {
            res.redirect(`/cube/${cubeId}/details`)
        }).catch(next)
    }
}