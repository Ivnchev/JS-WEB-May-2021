const env = process.env.NODE_ENV || 'dev'
const config = require('./config.json')
module.exports = config[env]