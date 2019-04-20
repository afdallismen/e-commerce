const routes = require('express').Router()

const UserCart = require('../../controllers/User/Cart')
const UserTransaction = require('../../controllers/User/Transaction')

routes.get('/', UserCart.list)
routes.post('/', UserCart.addProduct)
routes.delete('/', UserCart.clear)
routes.delete('/:product_id', UserCart.removeProduct)
routes.post('/check-out', UserTransaction.create)

module.exports = routes