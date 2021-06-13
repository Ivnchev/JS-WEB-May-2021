const User = require('../models/User')
const controllers = require('../modules/controller-factory')(User)
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/config')['development']

module.exports = {
    login: async function (username, password) {
        const user = await controllers.getOne({ username })

        if (!user) throw { message: 'Invalid username or password!', status: 204 }

        const match = await user.comparePasswords(password)

        if (!match) throw { message: 'Invalid username or password!', status: 204 }

        const token = jwt.sign({ _id: user._id, username: user.username }, SECRET)

        return token
    },
    register: async function (username, password) {
        const user = await controllers.createOne({ username, password })

        if (!user) throw { message: 'Invalid username or password!', status: 204 }

        return user
    },
}