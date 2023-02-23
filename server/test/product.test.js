const chai = require('chai')
const chaiHttp = require('chai-http')
const fs = require('fs')

const app = require('../app')
const User = require('../models/User')
const Product = require('../models/Product')

chai.use(chaiHttp)
const expect = chai.expect

let token

before('get JWT Token', function(done) {
  const body = {
    email: 'john@doe.com',
    password: 'secretofjohndoe'
    // isAdmin: true
  }
  chai
    .request(app)
    .post('/users/login')
    .send(body)
    .end(function(err, res) {
      token = res.body.token
      done()
    })
})

// after('delete all', function() {
//   return Product.deleteMany({})
// })

describe('Products', function() {
  describe('/proudcts', function() {
    describe('Should return list of products', function() {
      it('Should return list of proudcts', function(done) {
        chai
          .request(app)
          .get('/products')
          .end(function(err, res) {
            expect(res.status).to.equal(200)
            expect(res.body).to.be.an('array')
            done()
          })
      })
    })
  })

  describe('/products/create', function() {
    describe('Should throw error 401 not authenticated', function() {
      describe('[ CREATE ] Should return not authenticated if no access_token', function() {
        it('Should return not authenticated if no access_token', function(done) {
          const body = {
            name: 'table1',
            price: '123',
            stock: 10,
            categories: ['a', 's', 'd', 'f'],
            image: 'ini image',
            description: '123123lotem'
          }
          chai
            .request(app)
            .post('/products/create')
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

  describe('Creating Product', function() {
    describe('Correct Data Params', function() {
      describe('[ CREATE ] Should return created product object', function() {
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
              done()
            })
        }).timeout(30000)
      })
    })

    describe('Invalid Data Params', function() {
      describe('[ Product ] should throw error minimal stock is 0', function() {
        it('Minimal stock is 0', function(done) {
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
            .field('name', 'product1')
            .field('price', '1500000')
            .field('stock', -1)
            .field('categories', ['a', 's', 'd', 'f'])
            .field('description', 'lorem ipsum')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .to.include('Minimal stock is 0')
              expect(res.body).to.have.lengthOf(1)
              done()
            })
        }).timeout(30000)
      })
      describe('[ Product ] should throw error all field is required', function() {
        it('All field required', function(done) {
          const product = {
            name: '',
            price: '',
            stock: '',
            categories: [],
            image: '',
            description: ''
          }
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', '')
            .field('name', '')
            .field('price', '')
            .field('stock', '')
            .field('categories', [])
            .field('description', '')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(5)
              done()
            })
        })
      })
      describe('[ Product ] should throw error field name is required', function() {
        it('Name is required', function(done) {
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
            .field('name', '')
            .field('price', '1500000')
            .field('stock', 1)
            .field('categories', ['a', 's', 'd', 'f'])
            .field('description', 'lorem ipsum')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        }).timeout(30000)
      })
      describe('[ Product ] should throw error field price is required', function() {
        it('price is required', function(done) {
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
            .field('name', 'aasdasd')
            .field('price', '')
            .field('stock', 1)
            .field('categories', ['a', 's', 'd', 'f'])
            .field('description', 'lorem ipsum')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        }).timeout(30000)
      })
      describe('[ Product ] should throw error field stock is required', function() {
        it('stock is required', function(done) {
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
            .field('name', 'aasdasd')
            .field('price', '123123')
            .field('stock', '')
            .field('categories', ['a', 's', 'd', 'f'])
            .field('description', 'lorem ipsum')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        }).timeout(30000)
      })
      describe('[ Product ] should throw error field image is required', function() {
        it('image is required', function(done) {
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', '')
            .field('name', 'aasdasd')
            .field('price', '123123')
            .field('stock', 12)
            .field('categories', ['a', 's', 'd', 'f'])
            .field('description', 'lorem ipsum')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        }).timeout(30000)
      })
      describe('[ Product ] should throw error field description is required', function() {
        it('description is required', function(done) {
          const headers = { access_token: token }
          chai
            .request(app)
            .post('/products/create')
            .set(headers)
            .attach('image', fs.readFileSync('./test/example.jpg'), 'example.jpg')
            .field('name', 'aasdasd')
            .field('price', '123123')
            .field('stock', 12)
            .field('categories', ['a', 's', 'd', 'f'])
            .field('description', '')
            .end(function(err, res) {
              expect(res.status).to.equal(400)
              expect(res.body)
                .to.be.an('array')
                .that.to.have.lengthOf(1)
              done()
            })
        }).timeout(30000)
      })
    })
  })
})
