const models = require('../models')

class Product {
  static findAll (req, res) {
    models.Product
      .find()
      .then(products => res.status(200).json({ products }))
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static findById (req, res) {
    models.Product
      .findById(req.params.product_id)
      .then(product => res.status(200).json({ product }))
      .catch(err => res.status(500).json({ message: 'Internal Server Error.'}))
  }
}

module.exports = Product