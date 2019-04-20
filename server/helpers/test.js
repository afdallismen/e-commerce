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
  createUser: _ => {
    let rawPassword = faker.internet.password()
    return models.User
      .create({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: rawPassword
      })
      .then(user => {
        user.rawPassword = rawPassword
        return user
      })
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
  createProduct: owner_id => {
    return models.Product
      .create({
        name: faker.commerce.productName(),
        stock: faker.random.number(),
        price: faker.commerce.price(),
        owner_id
      })
  },
  addProduct: (user, product) => {
    user.cart.push(product._id)
    return user.save()
  }
}