
const catService = require('../services/catService')

module.exports = async function (req, res) {
    const query = req.url.split('=')[1] || undefined
    catService.loadHome(query)
        .then(data => { res.end(data) })
        .catch(err => { throw err })
}

