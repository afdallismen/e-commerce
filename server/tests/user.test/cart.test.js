const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../../app')
const {
  clearDb,
  createUser,
  loginUser,
  createProduct,
  addProduct
} = require('../../helpers/test')

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
    createUser.call(this, done)
  })

  before(function (done) {
    loginUser.call(this, done)
  })

  before(function (done) {
    createProduct.call(this, done)
  })

  describe('POST /users/:user_id/cart', function () {
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post(`/users/${this.user._id}/cart`)
        .set('Authorization', `Bearer ${this.user.token}`)
        .send({ product: this.product })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.property('count')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body.product._id).to.equal(String(this.product._id))
          expect(res.body.count).to.equal(1)
          chai
            .request(app)
            .post(`/users/${this.user._id}/cart`)
            .set('Authorization', `Bearer ${this.user.token}`)
            .send({ product: this.product })
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(201)
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('product')
              expect(res.body).to.have.property('count')
              expect(res.body).to.have.nested.property('product._id')
              expect(res.body.product._id).to.equal(String(this.product._id))
              expect(res.body.count).to.equal(2)
              done()
            })
        })
    })
  })

  describe('DELETE /users/:user_id/cart/:product_id', function () {
    before(function (done) {
      addProduct.call(this, done)
    })

    it('should send an object with 200 status code', function (done) {
      let previousCount = this.user.cart
        .toObject()
        .filter(id => id == this.product._id)
        .length
      chai
        .request(app)
        .delete(`/users/${this.user._id}/cart/${this.product._id}`)
        .set('Authorization', `Bearer ${this.user.token}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body).to.have.property('count')
          expect(res.body).to.have.nested.property('product._id')
          expect(res.body.product._id).to.equal(String(this.product._id))
          expect(res.body.count).to.equal(previousCount - 1)
          done()
        })
    })
  })

  describe('POST /users/:user_id/cart/check-out', function () {
    before(function (done) {
      addProduct.call(this, done)
    })

    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post(`/users/${this.user._id}/cart/check-out`)
        .set('Authorization', `Bearer ${this.user.token}`)
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