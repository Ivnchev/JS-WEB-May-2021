const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path')

module.exports = (app) => {

    app.engine('hbs', handlebars({ extname: 'hbs' }))
    app.set('view engine', 'hbs')

    app.use(express.urlencoded({ extended: true }))

    app.use(express.static(path.join(global._basedir, 'static')))

};