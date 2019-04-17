const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/products', require('./products'))
routes.use('/users', require('./users'))

module.exports = routes