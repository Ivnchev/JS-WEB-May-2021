


module.exports = function (model) {

    const createOne = function (body) {
        return model.create(body)
    }

    const getAll = function (search) {
        return model.find(search)
    }

    const getOneById = function (id) {

        return model.findOne({ _id: id })
    }

    const updateOne = function (id, body) {
        return model.updateOne({ _id: id }, body)
    }



    return {
        getAll,
        getOneById,
        updateOne,
        createOne
    }

}