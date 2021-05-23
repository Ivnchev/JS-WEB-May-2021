const fs = require('fs')
const path = require('path')
const ext = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
    png: 'image/png',
    css: 'text/css',
}

module.exports = (req, res) => {
    const filename = req.url.slice(8)
    const extention = ext[filename.split('.')[1]]
    const realPath = path.join(global._basedir + '/static/' + filename)
    const file = fs.createReadStream(realPath)


    file.on('error', () => {
        res.statusCode = 404
        res.end('NOT FOUND!')
    })
    file.once('data', data => {
        res.writeHead(200, {
            'Content-type': extention
        })
    })
    file.on('data', function (data) { res.write(data) })
    file.on('end', () => res.end())

}