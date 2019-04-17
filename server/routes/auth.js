const routes = require('express').Router()

const Auth = require('../controllers/Auth')

routes.post('/register', Auth.register)
routes.post('/login', Auth.login)

module.exports = routes