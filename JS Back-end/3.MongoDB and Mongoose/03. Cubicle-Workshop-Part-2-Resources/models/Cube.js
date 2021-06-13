const mongoose = require('mongoose')



const schema = mongoose.Schema({
    name: {
        type: String
    },
    imageUrl: {
        type: String
    },
    description: {
        type: String
    },
    difficultyLevel: {
        type: String
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'accessory'
    }]
})

module.exports = mongoose.model('cube', schema)