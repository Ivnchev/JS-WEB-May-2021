const router = require('../config/router')
const homeComponent = require('./home-component/home.component')
const breedComponent = require('./breed-component/breed.component')
const catComponent = require('./cat-component/cat.component')

module.exports = function () {

    
    router.get('/', homeComponent)
    router.get('/search', homeComponent)
    router.get('/add-breed', breedComponent.get)
    router.post('/add-breed', breedComponent.post)
    router.get('/add-cat', catComponent.getAddCat)
    router.post('/add-cat', catComponent.postAddCat)
    router.get('/cats/:id/edit', catComponent.getEdit)
    router.post('/cats/:id/edit', catComponent.putEdit)
    router.get('/cats/:id/new-home', catComponent.getDeleteCat)
    router.post('/cats/:id/new-home', catComponent.postDeleteCat)

}
