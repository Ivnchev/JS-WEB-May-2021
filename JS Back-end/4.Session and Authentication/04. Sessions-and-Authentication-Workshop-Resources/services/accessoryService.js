const cubeModel = require('../models/Cube')
const accessoryModel = require('../models/Accessory')
const controllers = require('../modules/controller-factory')
const accessoryControllers = controllers(accessoryModel)
const cubeControllers = controllers(cubeModel)
module.exports = {
    createOne: (body) => accessoryControllers.createOne(body),
    getOne: (id) => cubeControllers.getOneById(id).lean(),
    getAll: (id) => accessoryControllers.getAll({ cubes: { $nin: id } }).lean(),
    updateOne: (accId, body) => accessoryControllers.updateOne(accId, body)
}