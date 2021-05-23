const formidable = require('formidable')
const breedService = require('../services/breedService')

async function get(req, res) {
    breedService.loadBreedPage()
        .then(data => { res.end(data) })
        .catch(err => { throw err })
}

function post(req, res) {
    const form = formidable.IncomingForm()
    form.parse(req, function (err, fields) {
        if (err) throw err
            breedService.postBreed(fields)
                .then(() => { 
                    console.log('Successful added ' + fields.breed);
                    res.writeHead(301, { 'location': '/' }).end() 
                })
                .catch(err => { throw err })
    })
}


module.exports = {
    get,
    post
}