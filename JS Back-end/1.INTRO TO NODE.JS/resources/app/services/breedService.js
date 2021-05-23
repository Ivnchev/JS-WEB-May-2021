const path = require('path')
const fs = require('fs/promises')
const loadTemplate = require('../../utils/layout')
const { database: { breedsURI } } = require('../../config/environments')

class BreedService {
    constructor(){
        this.breeds = require('../../config/database/breeds.json')
    }

    getBreeds(){
        return this.breeds
    }

    loadBreedPage(){
        const realPath = path.join(global._basedir, '/app/breed-component/addBreed.page.html')
        return loadTemplate(realPath)
    }

    postBreed(fields) {
        this.breeds.push(fields.breed)
        const realPath = path.join(global._basedir, breedsURI)
        return fs.writeFile(realPath, JSON.stringify(this.breeds))
    }


}


module.exports = new BreedService()