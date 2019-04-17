const faker = require('faker')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const models = require('../models')

module.exports = {
  clearDb: function (modelNames, done) {
    Promise.all(
      modelNames.map(
        modelName => models[modelName].deleteMany({})
      )
    )
    .then(_ => done())
    .catch(done)
  },
  createUser: function (done) {
    let rawPassword = faker.internet.password()
    models.User
      .create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: rawPassword
      })
      .then(user => {
        this.user = user
        this.user.rawPassword = rawPassword
        done()
      })
      .catch(done)
  },
  loginUser: function (done) {
    let token = jwt.sign({
      _id: this.user._id,
      username: this.user.username,
      email: this.user.email
    }, process.env.JWT_SECRET)
    this.user.token = token
    done()
  },
  createProduct: function (done) {
    models.Product
      .create({
        name: faker.commerce.productName(),
        stock: faker.random.number(),
        price: faker.commerce.price(),
        owner_id: this.user ? this.user._id : new mongoose.Types.ObjectId()
      })
      .then(product => {
        this.product = product
        done()
      })
      .catch(done)
  },
  addProduct: function (done) {
    this.user.cart.push(this.product._id)
    this.user.save()
      .then(user => {
        this.user = user
        done()
      })
      .catch(done)
  }
}