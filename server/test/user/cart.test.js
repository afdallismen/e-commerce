const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../app')
const {
  clearDb,
  createUser,
  createProduct,
  addProduct
} = require('../../helpers/test')
const { createToken } = require('../../helpers/auth')

const expect = chai.expect

chai.use(chaiHttp)

before(function (done) {
  clearDb(['Product', 'User', 'Transaction'], done)
})

after(function (done) {
  clearDb(['Product', 'User', 'Transaction'], done)
})

describe('User Cart tests', function () {
  before(function (done) {
    createUser()
      .then(user => {
        this.user = user
        this.token = createToken(user)
        return createProduct(user)
      })
      .then(product => {
        this.product = product
        done()
      })
      .catch(done)
  })

  describe('GET /users/:user_id/cart', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get(`/users/${this.user._id}/cart`)
        .set('Authorization', `Bearer ${this.token}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('cart')
          expect(res.body.cart).to.be.an('array')
          done()
        })
    })
  })

  describe('POST /users/:user_id/cart', function () {
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post(`/users/${this.user._id}/cart`)
        .set('Authorization', `Bearer ${this.token}`)
        .send({ product: this.product })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.property('count')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body.product._id).to.equal(this.product.id)
          expect(res.body.count).to.equal(1)
          chai
            .request(app)
            .post(`/users/${this.user._id}/cart`)
            .set('Authorization', `Bearer ${this.token}`)
            .send({ product: this.product })
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(201)
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('product')
              expect(res.body).to.have.property('count')
              expect(res.body).to.have.nested.property('product._id')
              expect(res.body.product._id).to.equal(this.product.id)
              expect(res.body.count).to.equal(2)
              done()
            })
        })
    })
  })

  describe('DELETE /users/:user_id/cart/:product_id', function () {
    before(function (done) {
      addProduct(this.user, this.product)
        .then(user => {
          this.user = user
          done()
        })
        .catch(done)
    })

    it('should send an object with 200 status code', function (done) {
      let previousCount = this.user.cart
        .toObject()
        .filter(id => id == this.product._id)
        .length
      chai
        .request(app)
        .delete(`/users/${this.user._id}/cart/${this.product._id}`)
        .set('Authorization', `Bearer ${this.token}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.property('count')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body.product._id).to.equal(this.product.id)
          expect(res.body.count).to.equal(previousCount - 1)
          done()
        })
    })
  })

  describe('DELETE /users/:user_id/cart', function () {
    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .delete(`/users/${this.user._id}/cart`)
        .set('Authorization', `Bearer ${this.token}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('cart')
          expect(res.body.cart).to.be.an('array')
          done()
        })
    })
  })

  describe('POST /users/:user_id/cart/check-out', function () {
    before(function (done) {
      addProduct(this.user, this.product)
        .then(user => {
          this.user = user
          done()
        })
        .catch(done)
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post(`/users/${this.user._id}/cart/check-out`)
        .set('Authorization', `Bearer ${this.token}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('transaction')
          expect(res.body).to.have.nested.property('transaction._id')
          expect(res.body).to.have.nested.property('transaction.owner_id')
          expect(res.body).to.have.nested.property('transaction.products')
          expect(res.body).to.have.nested.property('transaction.total')
          expect(res.body.transaction.products).to.be.an('array')
          expect(res.body.transaction.owner_id).to.equal(String(this.user._id))
          expect(res.body.transaction.total).to.equal(this.product.price)
          done()
        })
    })
  })
})