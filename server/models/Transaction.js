const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  total: Number
})

const Transaction = mongoose.model('transaction', transactionSchema)

module.exports = Transaction