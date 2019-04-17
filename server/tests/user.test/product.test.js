const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const app = require('../../app')
const {
  createUser,
  loginUser,
  clearDb,
  createProduct
} = require('../../helpers/test')

const expect = chai.expect

chai.use(chaiHttp)

before(function (done) {
  clearDb(['Product', 'User'], done)
})

after(function (done) {
  clearDb(['Product', 'User'], done)
})

describe('User Product tests', function () {
  before(function (done) {
    createUser.call(this, done)
  })

  before(function (done) {
    loginUser.call(this, done)
  })

  describe('POST /users/:user_id/products', function () {
    it('should return an object with 201 status code', function (done) {
      let createdProduct = {
        name: faker.commerce.productName(),
        stock: faker.random.number(),
        price: Number(faker.commerce.price())
      }
      chai
        .request(app)
        .post(`/users/${this.user._id}/products`)
        .set('Authorization', `Bearer ${this.user.token}`)
        .send(createdProduct)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body).to.have.nested.property('product.name')
          expect(res.body).to.have.nested.property('product.stock')
          expect(res.body).to.have.nested.property('product.price')
          expect(res.body).to.have.nested.property('product.owner_id')
          expect(res.body.product.owner_id).to.equal(String(this.user._id))
          expect(res.body.product.name).to.equal(createdProduct.name)
          expect(res.body.product.stock).to.equal(createdProduct.stock)
          expect(res.body.product.price).to.equal(createdProduct.price)
          done()
        })
    })
  })

  describe('PUT /users/:user_id/products/:product_id', function () {
    before(function (done) {
      createProduct.call(this, done)
    })

    it('should return an object with 200 status code', function (done) {
      let newProduct = {
        name: faker.commerce.productName(),
        stock: faker.random.number(),
        price: Number(faker.commerce.price())
      }
      chai
        .request(app)
        .put(`/users/${this.user._id}/products/${this.product._id}`)
        .set('Authorization', `Bearer ${this.user.token}`)
        .send(newProduct)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body).to.have.nested.property('product.name')
          expect(res.body).to.have.nested.property('product.stock')
          expect(res.body).to.have.nested.property('product.price')
          expect(res.body).to.have.nested.property('product.owner_id')
          expect(res.body.product.owner_id).to.equal(String(this.user._id))
          expect(res.body.product.name).to.equal(newProduct.name)
          expect(res.body.product.stock).to.equal(newProduct.stock)
          expect(res.body.product.price).to.equal(newProduct.price)
          done()
        })
    })
  })

  describe('DELETE /users/:user_id/products/:product_id', function () {
    before(function (done) {
      createProduct.call(this, done)
    })

    it('should return an object with 200 status code', function (done) {
      chai
        .request(app)
        .delete(`/users/${this.user._id}/products/${this.product._id}`)
        .set('Authorization', `Bearer ${this.user.token}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body.product._id).to.equal(String(this.product._id))
          done()
        })
    })
  })
})