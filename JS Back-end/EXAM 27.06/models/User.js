const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { security: { salt_rounds } } = require('../config')


const schema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: [/[A-Za-z0-9]+@[A-Za-z0-9]+\.bg/, 'Email should be a valid!']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required!'],
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not supported!'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be at least 4 characters !']
    },
    trips: [{
        type: mongoose.Types.ObjectId,
        ref: 'trip'
    }]
    
})

schema.methods.comparePasswords = function (password) {
    return bcrypt.compare(password, this.password)
}

schema.pre('save', function (next) {
    if (!this.isModified()) {
        next()
        return
    }

    bcrypt.genSalt(salt_rounds)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash
            next()
        }).catch(next)
})

module.exports = mongoose.model('user', schema)
