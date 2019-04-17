const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')

const app = require('../app')
const { clearDb, createUser } = require('../helpers/test')

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
    createUser.call(this, done)
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
          expect(res.body).to.have.nested.property('user._id')
          expect(res.body).to.have.nested.property('user.username')
          expect(res.body).to.have.nested.property('user.email')
          expect(res.body).to.not.have.nested.property('user.password')
          expect(res.body.user.username).to.equal(user.username)
          expect(res.body.user.email).to.equal(user.email)
          done()
        })
    })
  })

  describe('POST /auth/login', function () {
    it('should send an object with 201 status code', function (done) {
      chai
        .request(app)
        .post('/auth/login')
        .send({ login: this.user.username, password: this.user.rawPassword })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('user')
          expect(res.body).to.have.property('token')
          expect(res.body).to.have.nested.property('user.username')
          expect(res.body).to.have.nested.property('user.email')
          expect(res.body).to.not.have.nested.property('user.password')
          expect(res.body.user.username).to.equal(this.user.username)
          expect(res.body.user.email).to.equal(this.user.email)
          done()
        })
    })
  })
})