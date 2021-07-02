
const app = require('express')()
const { server: { port } } = require('./config')
const services = require('./services')
const routes = require('./routes')
const globalErrorHandler = require('./middlewares/globalErrorHandler')

require('./config/express')(app)
require('./config/mongoose')

app.use(function (req, res, next) {
    req.services = services
    next()
})

app.use(routes)



app.use(globalErrorHandler)



app.listen(port, () => console.log(`Server is listening on http://localhost:${port} !`))
