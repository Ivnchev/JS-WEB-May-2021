

const environment = process.env.NODE_ENV || 'dev'

const config = environment !== 'dev' ? require(`./${environment}.config.json`) : require('./dev.config.json')

module.exports = config