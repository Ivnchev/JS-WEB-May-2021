const cubeModel = require('../models/Cube')
const controllers = require('../modules/controller-factory')(cubeModel)

module.exports = {
    getCubes: (search) => controllers.getAll(search),
    getCube: (id) => controllers.getOneById(id).populate('accessories'),
    createCube: (body) => controllers.createOne(body),
    updateOne: (cubeId, body) => controllers.updateOne(cubeId, body),
    deleteOne: (id) => controllers.deleteOne(id)
}