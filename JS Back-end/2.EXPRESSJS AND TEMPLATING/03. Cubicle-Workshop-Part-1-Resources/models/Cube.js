const BaseModel = require('./Base')
const path = require('path')


class CubeModel extends BaseModel {

    constructor() {
        const filePath = path.join(global._basedir, './config/database.json')
        super(filePath)
    }

    insert(data) {
        if(Object.values(data).every(x => x == '')){
            return Promise.reject(new Error('BAD_REQUEST!'))
        }
        return super.insert(data)
    }

    getAll(data) {
        if(data === undefined){
            return super.getAll()
        }

        return super.search(function (entry) {
            const name = data.search ? entry.name.toLowerCase().includes(data.search.toLowerCase()) : true
            const from = data.from ? entry.difficultyLevel >= data.from : true
            const to = data.to ? entry.difficultyLevel <= data.to : true
            return name && from && to
        })


    }

}


module.exports = new CubeModel()