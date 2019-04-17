const { ObjectId } = require('mongoose').Types

const Product = require('../models/Product')

module.exports = {
  isOwner: (req, res, next) => {
    Product
      .findById(req.params.product_id)
      .then(product => {
        if (product.owner_id == req.params.user_id) {
          req.product = product
          next()
        } else {
          res.status(401).json({ message: 'Unauthorized access.' })
        }
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }
}