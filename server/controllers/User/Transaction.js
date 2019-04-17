const models = require('../../models')

class Transaction {
  static create (req, res) {
    req.user
      .populate('cart', (err, user) => {
        if (err) res.status(500).json({ message: 'Internal Server Error.' })
        else {
          let total = user.cart
            .toObject()
            .reduce((acc, curr) => acc + curr.price, 0)
          models.Transaction
            .create({
              owner_id: req.user._id,
              products: req.user.cart,
              total
            })
            .then(transaction => {
              res.status(201).json({ transaction })
            })
        }
      })
      // .then(user => {
      //   return models.Transaction
      //     .create({
      //       owner_id: req.user._id,
      //       products: req.user.cart,
      //       total: user.cart
      //         .toObject()
      //         .reduce((acc, curr) => acc + curr.price, 0)
      //     })
      // })
      // .then(transaction => {
      //   res.status(200).json({ transaction })
      // })
      // .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }
}

module.exports = Transaction