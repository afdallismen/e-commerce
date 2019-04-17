const routes = require('express').Router()

const Product = require('../controllers/Product')

routes.get('/', Product.findAll)
routes.get('/:product_id', Product.findById)

module.exports = routes