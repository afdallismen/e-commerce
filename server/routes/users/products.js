const routes = require('express').Router({ mergeParams: true })

const UserProduct = require('../../controllers/User/Product')
const { isOwner } = require('../../middlewares/product')

routes.post('/', UserProduct.create)
routes.put('/:product_id', isOwner, UserProduct.update)
routes.delete('/:product_id', isOwner, UserProduct.delete)

module.exports = routes