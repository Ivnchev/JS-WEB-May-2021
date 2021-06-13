const cubeService = require('../services/cubeService')

module.exports = {
    isOwner: function (req, res, next) {
        cubeService.getCube(req.params.id)
            .then(cube => {
                if (cube.author._id.toString() !== req.user?._id) {
                    return res.redirect('/auth/login')
                }
                next()
            })
    },
    isAuth: function (req, res, next) {
        if (req.user === undefined) {
            return res.redirect('/auth/login')
        }
        next()
    }
}