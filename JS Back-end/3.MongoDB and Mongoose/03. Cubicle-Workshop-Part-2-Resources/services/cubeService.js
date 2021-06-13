const cubeModel = require('../models/Cube')
const controllers = require('../modules/controller-factory')(cubeModel)
module.exports = {
    getCubes: function (req, res, next) {
        const query = req.query
        const search = req.query
            ? { name: { $regex: query.search || '', $options: 'i' }, difficultyLevel: { $gte: query.from || 0, $lte: query.to || 6 } }
            : {}
        controllers.getAll(search)
            .then(x => res.render('index', { x, query }))
            .catch(next)
    },
    getCube: function (req, res, next) {
        controllers.getOneById(req.params.id).populate('accessories')
            .then(cube => res.render('details', { cube }))
            .catch(next)
    },
    getCreate: function (req, res, next) { res.render('create') },

    postCreate: function (req, res, next) {
        const body = Object.entries(req.body)
            .reduce((a, b) => Object.assign(a, { [b[0]]: b[0] === 'difficultyLevel' ? Number(b[1]) : b[1] }), {})
        controllers.createOne(body)
            .then(() => res.redirect('/'))
            .catch(next)
    },
}