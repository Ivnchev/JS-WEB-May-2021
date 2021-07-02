


module.exports = function (model) {

    const createOne = function (body) {
        return model.create(body)
    }

    const getAll = function (search) {
        return model.find(search)
    }

    const getOne = function (params) {
        return model.findOne(params)
    }

    const getOneById = function (id) {
        return model.findOne({ _id: id })
    }

    const updateOne = function (id, body) {
        return model.updateOne({ _id: id }, body,  { runValidators: true })
    }

    const deleteOne = function (id) {
        return model.deleteOne({ _id: id })
    }



    return {
        getAll,
        getOne,
        getOneById,
        updateOne,
        createOne,
        deleteOne
    }

}