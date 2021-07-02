const mongoose = require('mongoose')

const { database: { db_name, db_uri, db_options } } = require('./index')

mongoose.connect(db_uri + db_name, db_options)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => console.log('Connected to the database !'))