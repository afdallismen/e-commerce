const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: String,
  stock: Number,
  price: Number,
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Product = mongoose.model('product', productSchema)

module.exports = Product