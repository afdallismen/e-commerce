const Product = require('../../models/Product')

class Cart {
  static addProduct (req, res) {
    Product
      .findById(req.body.product._id)
      .then(product => {
        if (product) {
          req.user.cart.push(product._id)
          return req.user.save()
        } else {
          res.status(404).json({ message: 'Product not found.' })
        }
      })
      .then(user => {
        let count = user.cart
          .toObject()
          .filter(id => id == req.body.product._id)
          .length
        res.status(201).json({
          product: req.body.product,
          count
        })
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static removeProduct (req, res) {
    Product
      .findById(req.params.product_id)
      .then(product => {
        if (product) {
          req.user.cart.pull(product._id)
          return req.user.save()
        } else {
          res.status(404).json({ message: 'Product not found.' })
        }
      })
      .then(user => {
        let count = user.cart
          .toObject()
          .filter(id => id == req.params.product_id)
          .length
        res.status(200).json({
          product: { _id: req.params.product_id },
          count
        })
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static clear (req, res) {
    req.user.cart.splice()
    req.user.save()
      .then(user => {
        res.status(200).json({ cart: req.user.cart })
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }
}

module.exports = Cart