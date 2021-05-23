global._basedir = __dirname
const http = require('http')
const { PORT, URL } = require('./config/environments')

const router = require('./config/router')

require('./app/routes')()

http.createServer(requiestHandler)
    .listen(PORT, () => console.log('Server is listening on: ' + `${URL}:${PORT}`))


function requiestHandler(req, res) {
    console.log('>>>', req.method, req.url)
    const handler = router.matchRequests(req.method, req.url)
    handler(req,res)
}