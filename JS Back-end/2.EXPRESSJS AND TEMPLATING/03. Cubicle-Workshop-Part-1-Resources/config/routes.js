const controllers = require('../controllers/cube')

module.exports = (app) => {
    app.get('/', controllers.getCubes)
    app.get('/details/:id', controllers.getCube)
    app.get('/create', controllers.getCreate)
    app.post('/create', controllers.postCreate)
    app.get('/about', (req, res) => res.render('about'))
    app.get('*', (req, res) => res.render('404'))
};