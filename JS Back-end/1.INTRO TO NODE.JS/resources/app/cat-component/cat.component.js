const formidable = require('formidable')
const catService = require('../services/catService')

async function getAddCat(req, res) {
    catService.loadAddCat()
        .then(data => { res.end(data) })
        .catch(err => { throw err })
}

function postAddCat(req, res) {
    const form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
        if (err) throw err

        catService.addCat(fields, files)
            .then(() => { res.writeHead(301, { 'location': '/' }).end() })
            .catch(err => { throw err })
    })

}

async function getEdit(req, res) {
    const id = Number(req.url.split('/')[2])
    catService.loadEditCat(id)
        .then(data => { res.end(data) })
        .catch(err => { throw err })
}

async function putEdit(req, res) {
    const form = new formidable.IncomingForm()
    const id = Number(req.url.split('/')[2])

    form.parse(req, function (err, fields, files) {
        if (err) throw err

        catService.editCat(fields, files, id)
            .then(() => {
                console.log('Successful updated!');
                res.writeHead(301, { 'location': '/' }).end()
            }).catch(err => { throw err })
    })

}

async function getDeleteCat(req, res) {
    const id = Number(req.url.split('/')[2])
    catService.getDeleteCat(id)
        .then(data => { res.end(data) })
        .catch(err => { throw err })
}

async function postDeleteCat(req, res) {
    const id = Number(req.url.split('/')[2])
    catService.postDeleteCat(id)
        .then(() => { res.writeHead(301, { 'location': '/' }).end() })
        .catch(err => { throw err })
}



module.exports = {
    getAddCat,
    postAddCat,
    getEdit,
    putEdit,
    getDeleteCat,
    postDeleteCat
}