const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const app = require('../app')
const { clearDb, createUser } = require('../helpers/test')
const { verifyToken } = require('../helpers/auth')

const expect = chai.expect

chai.use(chaiHttp)

before(function (done) {
  clearDb(['User'], done)
})

after(function (done) {
  clearDb(['User'], done)
})

describe('Auth tests', _ => {
  before(function (done) {
    createUser()
      .then(user => {
        this.user = user
        done()
      })
      .catch(done)
  })

  describe('POST /auth/register', _ => {
    it('should send an object with 201 status code', done => {
      let user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      chai
        .request(app)
        .post('/auth/register')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('user')
          expect(res.body.user).to.have.property('_id')
          expect(res.body.user).to.have.property('username')
          expect(res.body.user).to.have.property('email')
          expect(res.body.user).to.have.property('cart')
          expect(res.body.user).to.not.have.property('password')
          expect(res.body.user.username).to.equal(user.username)
          expect(res.body.user.email).to.equal(user.email)
          expect(res.body.user.cart).to.be.empty
          done()
        })
    })
  })

  describe('POST /auth/login', function () {
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({ email: this.user.email, password: this.user.rawPassword })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('user')
          expect(res.body.user).to.have.property('_id')
          expect(res.body.user).to.have.property('username')
          expect(res.body.user).to.have.property('email')
          expect(res.body.user).to.have.property('cart')
          expect(res.body.user).to.not.have.property('password')
          expect(res.body.user._id).to.equal(this.user.id)
          expect(res.body.user.username).to.equal(this.user.username)
          expect(res.body.user.email).to.equal(this.user.email)
          expect(res.body.user.cart).to.be.empty

          expect(res.body).to.have.property('token')
          expect(res.body.token).to.not.equal(false)
          expect((verifyToken(res.body.token)._id)).to.equal(this.user.id)
          done()
        })
    })
  })
})