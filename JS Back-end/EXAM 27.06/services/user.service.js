const User = require('../models/User')

const getOne = (id) => User.findById(id).populate('trips').lean()

module.exports = {
    getOne
}