const mongoose = require('mongoose')


const schema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    cubes: [{
        type: mongoose.Types.ObjectId,
        ref: 'cube'
    }]
})

module.exports = mongoose.model('accessory', schema)