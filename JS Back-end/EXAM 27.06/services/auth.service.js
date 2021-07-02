const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { security: { secret, cookie_name } } = require('../config')

const login = async function (email, password) {

    const data = await User.findOne({ email: email })

    if (!data) throw { errors: [{ message: 'Invalid email or password!', status: 204 }] }

    const compare = await data.comparePasswords(password)

    if (!compare) throw { errors: [{ message: 'Invalid email or password!', status: 204 }] }

    const token = jwt.sign({ _id: data._id, email: data.email }, secret)

    return token

}

const register = async function (email, password, gender) {
    
    const user = await User.findOne({ email: email })

    if (user) throw { errors: [{ message: 'There is a user registered with that email!', status: 204 }] }

    const data = await User.create({ email, password, gender })

    if (!data) throw { errors: [{ message: 'Invalid email or password!', status: 204 }] }

    return login(email, password)

}

const logout = async function (res) {
    return await res.clearCookie(cookie_name)
}


module.exports = {
    logout,
    login,
    register
}