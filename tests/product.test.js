const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
const { Product } = require('../models/')

let access_token
let cust_access_token
let fullName = 'Admin 1'
let fullNameCust = 'Customer 1'
let adminMail = `test@mail.com`
let userPassword = '123456'
let productId

beforeAll((done) => {
  queryInterface
    .bulkInsert(
      'Users',
      [
        {
          full_name: fullName,
          email: adminMail,
          password: userPassword,
          role: `Admin`,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          full_name: fullNameCust,
          email: `user@mail.com`,
          password: userPassword,
          role: `Customer`,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
    .then((user) => {
      access_token = generateToken({ email: adminMail })
      cust_access_token = generateToken({ email: `user@mail.com` })
      console.log(access_token)

      return Product.create(
        {
          name: 'testProduct',
          image_url: 'http://www.google.com',
          price: 30000,
          stock: 10,
          userId: user.id
        },
        { returning: true }
      )
    })
    .then((data) => {
      productId = data.id
      console.log(productId, '<<< Product Id')
      done()
    })
    .catch((err) => {
      done(err)
    })
})

afterAll((done) => {
  queryInterface
    .bulkDelete('Products', null, {})
    .then((_) => {
      return queryInterface.bulkDelete('Users', null, {})
    })
    .then((_) => {
      user_access_token = null
      access_token = null
      done()
    })
    .catch((err) => {
      done(err)
    })
})

describe(`Add New Products /product`, () => {
  it(`1. Success add new product`, (done) => {
    request(app)
      .post(`/product`)
      .set('token', access_token)
      .send({
        name: 'Product 1',
        image_url: 'https://www.google.com',
        price: 30000,
        stock: 10,
        userId: 33 //random for test
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(201)
        expect(body).toHaveProperty('message', 'New product added!')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`2. Test no access token`, (done) => {
    request(app)
      .post(`/product`)
      .send({
        name: 'Product 1',
        image_url: 'https://www.google.com',
        price: 30000,
        stock: 10,
        userId: 33 //random for test
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal Server Error')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`3. User try to insert`, (done) => {
    request(app)
      .post(`/product`)
      .set('token', cust_access_token)
      .send({
        name: 'Product 1',
        image_url: 'https://www.google.com',
        price: 30000,
        stock: 10,
        userId: 33 // for test only
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal Server Error')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`4. Insert price below 0`, (done) => {
    request(app)
      .post(`/product`)
      .set('token', access_token)
      .send({
        name: 'Product 1',
        image_url: 'https://www.google.com',
        price: -100,
        stock: 10,
        userId: 33 // for test only
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Price must be greater than 0')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`5. Insert stock below 0`, (done) => {
    request(app)
      .post(`/product`)
      .set('token', access_token)
      .send({
        name: 'Product 1',
        image_url: 'https://www.google.com',
        price: 30000,
        stock: -10,
        userId: 33 // for test only
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Stock can't be less than 0`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`6. Missing fields`, (done) => {
    request(app)
      .post(`/product`)
      .set('token', access_token)
      .send({ name: '', image_url: '', price: '', stock: '' })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body.message).toContain('Product name is required')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`7. Stock filled with string`, (done) => {
    request(app)
      .post(`/product`)
      .set('token', access_token)
      .send({
        name: 'Image',
        image_url: 'https://www.google.com',
        price: 'asdfasdf',
        stock: 'asdas',
        userId: 33
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body.message).toContain('Only can fill with number')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe(`Update Product /product`, () => {
  it(`1. Success update product`, (done) => {
    request(app)
      .put(`/product/${productId}`)
      .set(`token`, access_token)
      .send({
        name: 'Updated Item',
        image_url: 'https://www.google.com',
        price: 50000,
        stock: 40
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toHaveProperty('message', 'Product updated!')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`2. User try update Product Data`, (done) => {
    request(app)
      .put(`/product/${productId}`)
      .set(`token`, cust_access_token)
      .send({
        name: 'Updated Item',
        image_url: 'https://www.google.com',
        price: 50000,
        stock: 40
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal Server Error')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`3. Update without access token`, (done) => {
    request(app)
      .put(`/product/${productId}`)
      .send({
        name: 'Updated Item',
        image_url: 'https://www.google.com',
        price: 50000,
        stock: 40
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(500)
        expect(body).toHaveProperty('message', 'Internal Server Error')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`4. Admin input price less than 0 `, (done) => {
    request(app)
      .put(`/product/${productId}`)
      .set(`token`, access_token)
      .send({
        name: 'Updated Item',
        image_url: 'https://www.google.com',
        price: -50000,
        stock: 40
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Price must be greater than 0')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`5. Admin input stock less than 0 `, (done) => {
    request(app)
      .put(`/product/${productId}`)
      .set(`token`, access_token)
      .send({
        name: 'Updated Item',
        image_url: 'https://www.google.com',
        price: 50000,
        stock: -40
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', `Stock can't be less than 0`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`6. Price filled with String`, (done) => {
    request(app)
      .put(`/product/${productId}`)
      .set(`token`, access_token)
      .send({
        name: 'Updated Item',
        image_url: 'https://www.google.com',
        price: 'asdfasdf',
        stock: 40
      })
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(400)
        expect(body).toHaveProperty('message', 'Only can fill with number')
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})

describe('Delete Product /product', () => {
  it('1. Success delete product', (done) => {
    request(app)
      .delete(`/product/${productId}`)
      .set('token', access_token)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(200)
        expect(body).toHaveProperty('message', `Product deleted!`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it('2. Try delete using customer access token', (done) => {
    request(app)
      .delete(`/product/${productId}`)
      .set('token', cust_access_token)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(500)
        expect(body).toHaveProperty('message', `Internal Server Error`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
  it('3. Try delete without access token', (done) => {
    request(app)
      .delete(`/product/${productId}`)
      // .set('token', cust_access_token)
      .then((response) => {
        const { body, status } = response

        expect(status).toBe(500)
        expect(body).toHaveProperty('message', `Internal Server Error`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
