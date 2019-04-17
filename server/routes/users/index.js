const routes = require('express').Router()

const { loggedIn } = require('../../middlewares/auth')
const { isSelf } = require('../../middlewares/user')

routes.use('/:user_id/products', loggedIn, isSelf, require('./products'))
routes.use('/:user_id/cart', loggedIn, isSelf, require('./cart'))

module.exports = routes