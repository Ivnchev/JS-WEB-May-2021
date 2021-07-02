const mongoose = require('mongoose')

const schema = mongoose.Schema({
    startPoint: {
        type: String,
        required: [true, 'startPoint is required!'],
        unique: true,
        minLength: [4, 'startPoint should be at least 3 characters!']
    },
    endPoint: {
        type: String,
        required: [true, 'endPoint is required!'],
        minLength: [4, 'endPoint should be at least 3 characters!']
    },
    date: {
        type: String,
        required: [true, 'time is required!'],
    },
    time: {
        type: String,
        required: [true, 'time is required!'],
    },
    carImage: {
        type: String,
        required: [true, 'carImage is required!'],
        match: [/^https?:\/\//, 'Image URL is incorrect!']
    },
    carBrand: {
        type: String,
        required: [true, 'carBrand is required!'],
        minLength: [4, 'endPoint should be at least 4 characters!']
    },
    seats: {
        type: Number,
        required: [true, 'seats is required!'],
        min: [0, 'seats should be at least 0!'],
        default: 0,
        max: [4, 'seats should be maximum 4!'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        default: 0,
        min: [1, 'price should be at least 1!'],
        max: [50, 'price should be maximum 50!'],
    },
    description: {
        type: String,
        required: [true, 'description is required!'],
        minLength: [10, 'endPoint should be at least 10 characters!']
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    buddies: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }]
})

module.exports = mongoose.model('trip', schema)