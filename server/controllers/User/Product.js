const models = require('../../models')

class Product {
  static create (req, res) {
    models.Product
      .create({
        name: req.body.name,
        stock: req.body.stock,
        price: req.body.price,
        image: 'http://localhost:3000/' + req.file.path,
        owner_id: req.params.user_id
      })
      .then(product => res.status(201).json({ product }))
      .catch(err => res.status(500).json({ message: 'Invalid Server Error.'}))
  }

  static update (req, res) {
    req.product.image = 'http://localhost:3000/' + req.file.path
    req.product.name = req.body.name
    req.product.stock = req.body.stock
    req.product.price = req.body.price
    req.product.save()
      .then(product => {
        res.status(200).json({ product })
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static delete (req, res) {
    req.product.remove()
      .then(product => {
        res.status(200).json({ product: { _id: product._id }})
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.'}))
  }
}

module.exports = Product