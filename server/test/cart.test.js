const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')

const app = require('../app')
const User = require('../models/User')
const Cart = require('../models/Cart')

chai.use(chaiHttp)
const expect = chai.expect

let token
let userId
let productId

before('get JWT Token', function(done) {
  const body = {
    email: 'john@doe.com',
    password: 'secretofjohndoe'
  }
  chai
    .request(app)
    .post('/users/login')
    .send(body)
    .end(function(err, res) {
      token = res.body.token
      userId = res.body._id
      done()
    })
})

// after('delete all', function() {
//   return Cart.deleteMany({})
// })

describe('Carts', function() {
  describe('/proudcts', function() {
    describe('Should return list of carts', function() {
      it('Should return list of proudcts', function(done) {
        chai
          .request(app)
          .get('/carts')
          .set({ access_token: token })
          .end(function(err, res) {
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
            done()
          })
      })
    })
  })

  describe('Create product', function() {
    it('[ CREATE ] Should return created product object', function(done) {
      const headers = { access_token: token }
      chai
        .request(app)
        .post('/products/create')
        .set(headers)
        .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
        .field('name', 'product1')
        .field('price', '1500000')
        .field('stock', 100)
        .field('categories', ['a', 's', 'd', 'f'])
        .field('description', 'lorem ipsum')
        .end(function(err, res) {
          expect(res.status).to.equal(201)
          expect(res.body).to.haveOwnProperty('_id')
          expect(res.body)
            .to.haveOwnProperty('name')
            .that.to.be.a('string')
          expect(res.body)
            .to.haveOwnProperty('price')
            .that.to.be.a('string')
          expect(res.body)
            .to.haveOwnProperty('stock')
            .that.to.be.a('number')
          expect(res.body)
            .to.haveOwnProperty('categories')
            .that.to.be.a('array')
          expect(res.body)
            .to.haveOwnProperty('image')
            .that.to.be.a('string')
          expect(res.body)
            .to.haveOwnProperty('description')
            .that.to.be.a('string')
          productId = res.body._id
          done()
        })
    }).timeout(40000)
  })

  describe('/carts/create', function() {
    describe('Should throw error 401 not authenticated', function() {
      describe('[ CREATE ] Should return not authenticated if no access_token', function() {
        it('Should return not authenticated if no access_token', function(done) {
          const body = {
            userId,
            productId,
            quantity: 10,
            totalPrice: '123123'
          }
          chai
            .request(app)
            .post('/carts/create')
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(401)
              expect(res.body)
                .to.be.a('string')
                .that.have.string('Not Authenticated! You must login')
              done()
            })
        })
      })
    })
  })

  describe('Creating Cart', function() {
    describe('Correct Data Params', function() {
      describe('[ CREATE ] Should return created cart object', function() {
        it('[ CREATE ] Should return created cart object', function(done) {
          const body = {
            userId,
            productId,
            quantity: 10,
            totalPrice: '123123'
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/carts/create')
            .set(headers)
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(201)
              expect(res.body).to.haveOwnProperty('_id')
              expect(res.body).to.haveOwnProperty('userId')
              expect(res.body).to.haveOwnProperty('productId')
              expect(res.body)
                .to.haveOwnProperty('quantity')
                .that.to.be.a('number')
              expect(res.body)
                .to.haveOwnProperty('totalPrice')
                .that.to.be.a('string')
              done()
            })
        })
      })
    })

    describe('Invalid Data Params', function() {
      describe('[ Cart ] should throw error all field is required', function() {
        it('All field required', function(done) {
          const body = {
            // userId: '',
            // productId: '',
            // quantity: '',
            // totalPrice: ''
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/carts/create')
            .set(headers)
            .send(body)
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(3)
              done()
            })
        })
      })
      // describe('[ Cart ] should throw error field price is required', function() {
      //   it('price is required', function(done) {
      //     const headers = { access_token: token }
      //     chai
      //       .request(app)
      //       .post('/carts/create')
      //       .set(headers)
      //       .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
      //       .field('name', 'aasdasd')
      //       .field('price', '')
      //       .field('stock', 1)
      //       .field('categories', ['a', 's', 'd', 'f'])
      //       .field('description', 'lorem ipsum')
      //       .end(function(err, res) {
      //         expect(res.status).to.equal(400)
      //         expect(res.body)
      //           .to.be.an('array')
      //           .that.to.have.lengthOf(1)
      //         done()
      //       })
      //   }).timeout(25000)
      // })
      // describe('[ Cart ] should throw error field stock is required', function() {
      //   it('stock is required', function(done) {
      //     const headers = { access_token: token }
      //     chai
      //       .request(app)
      //       .post('/carts/create')
      //       .set(headers)
      //       .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
      //       .field('name', 'aasdasd')
      //       .field('price', '123123')
      //       .field('stock', '')
      //       .field('categories', ['a', 's', 'd', 'f'])
      //       .field('description', 'lorem ipsum')
      //       .end(function(err, res) {
      //         expect(res.status).to.equal(400)
      //         expect(res.body)
      //           .to.be.an('array')
      //           .that.to.have.lengthOf(1)
      //         done()
      //       })
      //   }).timeout(25000)
      // })
      // describe('[ Cart ] should throw error field image is required', function() {
      //   it('image is required', function(done) {
      //     const headers = { access_token: token }
      //     chai
      //       .request(app)
      //       .post('/carts/create')
      //       .set(headers)
      //       .attach('image', '')
      //       .field('name', 'aasdasd')
      //       .field('price', '123123')
      //       .field('stock', 12)
      //       .field('categories', ['a', 's', 'd', 'f'])
      //       .field('description', 'lorem ipsum')
      //       .end(function(err, res) {
      //         expect(res.status).to.equal(400)
      //         expect(res.body)
      //           .to.be.an('array')
      //           .that.to.have.lengthOf(1)
      //         done()
      //       })
      //   }).timeout(25000)
      // })
      // describe('[ Cart ] should throw error field description is required', function() {
      //   it('description is required', function(done) {
      //     const headers = { access_token: token }
      //     chai
      //       .request(app)
      //       .post('/carts/create')
      //       .set(headers)
      //       .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
      //       .field('name', 'aasdasd')
      //       .field('price', '123123')
      //       .field('stock', 12)
      //       .field('categories', ['a', 's', 'd', 'f'])
      //       .field('description', '')
      //       .end(function(err, res) {
      //         expect(res.status).to.equal(400)
      //         expect(res.body)
      //           .to.be.an('array')
      //           .that.to.have.lengthOf(1)
      //         done()
      //       })
      //   }).timeout(25000)
      // })
    })
  })
})
