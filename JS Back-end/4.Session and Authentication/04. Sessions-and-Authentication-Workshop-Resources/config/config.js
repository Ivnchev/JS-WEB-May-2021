module.exports = {
    development: {
        port: process.env.PORT || 3000,
        DB_URI: 'mongodb://localhost/',
        DB_NAME: 'cubicle',
        SALT_ROUNDS: 10,
        SECRET: 'my_secret',
        COOKIE_NAME: 'auth_cookie',
    },
    production: {}
};