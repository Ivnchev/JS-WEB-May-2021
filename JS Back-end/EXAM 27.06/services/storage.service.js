const Product = require('../models/Trip')
const User = require('../models/User')

const storageControllers = require('../utils/controller-factory')(Product)

module.exports = {
    create: async function (rowData, userId) {
        const data = await storageControllers.createOne(rowData)
        const user = await User.updateOne({ _id: userId }, { $push: { trips: data } })
        if (!data || !user) throw { errors: [{ message: 'Invalid data!', status: 204 }] }
        return data
    },
    update: function (id, data) {
        return storageControllers.updateOne(id, data)
    },
    delete: function (id) {
        return storageControllers.deleteOne(id)
    },
    getAll: function () {
        return storageControllers.getAll().lean()
    },
    
    getOne: function (id) {
        return storageControllers.getOne({ _id: id })
            .populate({
                path: 'buddies',
            }).populate({
                path: 'creator',
            }).lean()
    },

    isJoined: function (id, userId) {
        return storageControllers.getOne({ _id: id })
            .populate({
                path: 'buddies',
                match: { _id: userId },
                select: 'name-_id',
            }).lean()
    },
    updateJoined: async function (id, userId) {

        const data = await Product.findByIdAndUpdate({ _id: id }, { $push: { buddies: userId }, $inc: { 'seats': -1 } })

        if (!data) throw { errors: [{ message: 'Invalid data!', status: 204 }] }

        return data
    },

}
