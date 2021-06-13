const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}


module.exports = (config) => {
    const URI = config.DB_URI + config.DB_NAME
    mongoose.connect(URI, options)

    const db = mongoose.connection

    db.on('error', console.error.bind(console, 'Connection Error: '))
    db.once('open', () => {
        console.log('Connected DB!');
    })

    return db
}