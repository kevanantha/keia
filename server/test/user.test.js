const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp)

// after(function() {
//   return User.deleteMany({})
// })

describe('Auth User', function() {
  describe('POST /users/register', function() {
    describe('Correct Data Params', function() {
      describe('return object with token and status 201 or 400 if email is duplicate', function() {
        it('Should return an object with token with status 201', function(done) {
          const body = {
            email: 'john@doe.com',
            password: 'secretofjohndoe'
          }
          chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              if (Array.isArray(res.body)) {
                expect(res.status).to.equal(400)
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf(1)
                expect(res.body).to.include('Email is already taken')
              } else {
                expect(res.status).to.equal(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.haveOwnProperty('token')
              }
              done()
            })
        })
      })
    })

    describe('Incorrect Data Params', function() {
      describe('Empty Email', function() {
        it('Should throw error email required', function(done) {
          const body = {
            email: '',
            password: '123123'
          }
          chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body).to.be.an('array')
              expect(res.body).to.have.lengthOf(1)
              expect(res.body).to.include('Email is required')
              done()
            })
        })
      })
      describe('Empty Password', function() {
        it('Should throw error password required', function(done) {
          const body = {
            email: 'ke@mail.com',
            password: ''
          }
          chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body).to.be.an('array')
              expect(res.body).to.have.lengthOf(1)
              expect(res.body).to.include('Password is required')
              done()
            })
        })
      })
      describe('Email already exist and Empty Password', function() {
        it('Should throw error password invalid', function(done) {
          const body = {
            email: 'john@doe.com',
            password: ''
          }
          chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body).to.be.an('array')
              expect(res.body).to.have.lengthOf(2)
              done()
            })
        })
      })
      describe('Invalid Email', function() {
        it('Should throw error invalid email', function(done) {
          const body = {
            email: 'kev',
            password: '123123'
          }
          chai
            .request(app)
            .post('/users/register')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body).to.be.an('array')
              expect(res.body).to.have.lengthOf(1)
              expect(res.body).to.include('Invalid Email')
              done()
            })
        })
      })
    })
  })

  describe('POST /login', function() {
    describe('Correct Params', function() {
      describe('Should return token', function() {
        it('Should return token', function(done) {
          const body = {
            email: 'john@doe.com',
            password: 'secretofjohndoe'
          }
          chai
            .request(app)
            .post('/users/login')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(200)
              expect(res.body).to.be.an('object')
              expect(res.body)
                .to.haveOwnProperty('token')
                .that.to.be.a('string')
              done()
            })
        })
      })
    })
    describe('Invalid Data Params', function() {
      describe('Should return invalid email/password', function() {
        it('Should return invalid email/password', function(done) {
          const body = {
            email: 'kevin@email.com',
            passwods: '123123'
          }
          chai
            .request(app)
            .post('/users/login')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(401)
              expect(res.body).to.be.a('string')
              expect(res.body).to.have.string('Invalid email/password')
              done()
            })
        })
      })
    })
  })
})
