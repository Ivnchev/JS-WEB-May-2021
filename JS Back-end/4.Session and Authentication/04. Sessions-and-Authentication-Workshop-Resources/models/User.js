const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/config')['development']

const schema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})

schema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password)
}

schema.pre('save', function (next) {
    if (!this.isModified()) {
        next()
        return
    }

    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next()
        }).catch(next)
})


module.exports = mongoose.model('user', schema)

