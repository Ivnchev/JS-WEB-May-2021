const { database: { staticImagesURI, catsURI } } = require('../../config/environments/index')
const fs = require('fs/promises')
const path = require('path')
const loadTemplate = require('../../utils/layout')
const breedService = require('./breedService')

class CatService {
    constructor() {
        this.cats = require('../../config/database/cats.json')
        this.breeds = breedService.getBreeds()
    }

    loadHome(query) {
        const realPath = path.join(global._basedir, '/app/home-component/home.page.html')
        if (query !== undefined) {
            const catsSearch = this.searchCat(query)
            return loadTemplate(realPath, catsSearch)
        }
        return loadTemplate(realPath, this.cats)
    }

    searchCat(rowQuery) {
        const query = rowQuery.toLowerCase()
        const catsSearch = this.cats.filter(x => 
            (x.name.toLowerCase().includes(query)) || 
            (x.breed.toLowerCase().includes(query)) || 
            (x.description.toLowerCase().includes(query)))
        return catsSearch
    }

    findCatById(id) { return this.cats.find(x => x._id === id) }

    loadAddCat() {
        const realPath = path.join(global._basedir, '/app/cat-component/addCat.page.html')
        return loadTemplate(realPath, this.breeds)
    }

    addCat(fields, files) {
        const oldPath = files.upload.path
        const newPath = path.join(global._basedir, staticImagesURI, files.upload.name)

        fs.rename(oldPath, newPath, err => {
            if (err) throw err
            console.log('Successful added: ' + files.upload.name);
        })

        this.cats.push({ _id: (this.cats.length + 1), ...fields, image: files.upload.name })
        const realPath = path.join(global._basedir, catsURI)

        return fs.writeFile(realPath, JSON.stringify(this.cats))
    }

    loadEditCat(id) {
        const cat = this.findCatById(id)
        const editTemplate = require('../cat-component/editCat.page')
        const template = editTemplate(cat, this.breeds)
        return loadTemplate(undefined, template)
    }

    editCat(fields, files, id) {
        const oldPath = files.upload.path
        const newPath = path.join(global._basedir, staticImagesURI, files.upload.name)

        fs.rename(oldPath, newPath, err => {
            if (err) throw err
            console.log('Successful renamed!');
        })

        this.cats.splice((id - 1), 1, { _id: id, ...fields, image: files.upload.name })
        const realPath = path.join(global._basedir, catsURI)

        return fs.writeFile(realPath, JSON.stringify(cats))
    }

    getDeleteCat(id) {
        const cat = this.findCatById(id)
        const newHome = require('../cat-component/newHome.page')
        const template = newHome(cat)
        return loadTemplate(undefined, template)
    }

    postDeleteCat(id) {
        this.cats.splice((id - 1), 1)
        const realPath = path.join(global._basedir, catsURI)
        return fs.writeFile(realPath, JSON.stringify(this.cats))
    }



}

module.exports = new CatService()