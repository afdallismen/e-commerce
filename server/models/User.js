const mongoose = require('mongoose')

const { hashPassword, comparePassword } = require('../helpers/auth')

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
})

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = hashPassword(this.password)
  }
  next()
})

userSchema.methods.comparePassword = function (str) {
  return comparePassword(str, this.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User