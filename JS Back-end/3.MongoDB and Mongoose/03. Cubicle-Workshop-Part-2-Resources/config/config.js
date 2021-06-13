module.exports = {
    development: {
        port: process.env.PORT || 3000,
        DB_URI: 'mongodb://localhost/',
        DB_NAME: 'cubicle'
    },
    production: {}
};