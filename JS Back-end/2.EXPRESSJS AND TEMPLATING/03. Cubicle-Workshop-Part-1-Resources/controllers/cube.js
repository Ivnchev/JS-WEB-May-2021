const cubeModel = require('../models/Cube')

module.exports = {
    getCubes: function (req, res, next) {
        const query = Object.entries(req.query).reduce((a, [k, v]) => {
            a[k] = v == '' ? '' : (isNaN(v) ? v : Number(v))
            return a
        }, {})

        cubeModel.getAll(query)
            .then(x => res.render('index', { x, query }))
    },
    getCube: function (req, res, next) {
        cubeModel.findOneById(Number(req.params.id))
            .then(x => res.render('details', { x }))
            .catch(next)
    },
    getCreate: function (req, res, next) { res.render('create') },

    postCreate: function (req, res, next) {
        const body = Object.entries(req.body)
            .reduce((a, b) => Object.assign(a, { [b[0]]: b[0] === 'difficultyLevel' ? Number(b[1]) : b[1] }), {})
        cubeModel.insert(body)
            .then(() => res.redirect('/'))
            .catch(next)
    }


}