const routes = require('express').Router({ mergeParams: true })
const multer = require('multer')

const UserProduct = require('../../controllers/User/Product')
const { isOwner } = require('../../middlewares/product')

const upload = multer({ dest: 'uploads/' })

routes.post('/', upload.single('image'), UserProduct.create)
routes.put('/:product_id', upload.single('image'), isOwner, UserProduct.update)
routes.delete('/:product_id', isOwner, UserProduct.delete)

module.exports = routes