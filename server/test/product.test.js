const chai = require('chai')
const chaiHttp = require('chai-http')

const app = require('../app')
const { createProduct } = require('../helpers/test')

const expect = chai.expect

chai.use(chaiHttp)

describe('Product tests', _ => {
  describe('GET /products', _ => {
    it('should send an object with 200 status code', done => {
      chai
        .request(app)
        .get('/products')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('products')
          expect(res.body.products).to.be.an('array')
          done()
        })
    })
  })

  describe('GET /products/:product_id', function () {
    before(function (done) {
      createProduct()
        .then(product => {
          this.product = product
          done()
        })
        .catch(done)
    })

    it('should send an object with 200 status code', function (done) {
      chai
        .request(app)
        .get(`/products/${this.product._id}`)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('product')
          expect(res.body.product).to.have.property('_id')
          expect(res.body.product).to.have.property('name')
          expect(res.body.product).to.have.property('stock')
          expect(res.body.product).to.have.property('price')
          expect(res.body.product._id).to.equal(this.product.id)
          expect(res.body.product.name).to.equal(this.product.name)
          expect(res.body.product.stock).to.equal(this.product.stock)
          expect(res.body.product.price).to.equal(this.product.price)
          done()
        })
    })
  })
})