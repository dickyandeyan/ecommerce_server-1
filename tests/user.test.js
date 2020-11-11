const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/')
const { queryInterface } = sequelize
const { User } = require('../models/')

beforeAll((done) => {
  User.create({
    full_name: 'Admin 1',
    email: 'test@mail.com',
    password: 'default',
    role: 'Customer',
    createdAt: new Date(),
    updatedAt: new Date()
  })
    .then((_) => {
      done()
    })
    .catch((error) => {
      done(error)
    })
})

afterAll((done) => {
  queryInterface
    .bulkDelete(`Users`, null, {})
    .then((_) => {
      done()
    })
    .catch((error) => {
      done(error)
    })
})

describe(`User Login Test`, () => {
  it(`User login Success`, (done) => {
    request(app)
      .post('/login')
      .send({ email: 'test@mail.com', password: 'default' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('access_token', expect.any(String))
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`1. Login with wrong email`, (done) => {
    request(app)
      .post('/login')
      .send({ email: 'wrong@mail.com', password: 'default' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', `Username or password is wrong`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`2. Login email with wrong password`, (done) => {
    request(app)
      .post('/login')
      .send({ email: 'test@mail.com', password: 'defaultSalah' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', `Username or password is wrong`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`3. Login missing email`, (done) => {
    request(app)
      .post('/login')
      .send({ email: '', password: 'defaultSalah' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', `Username or password is wrong`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })

  it(`4. Login missing password`, (done) => {
    request(app)
      .post('/login')
      .send({ email: 'test@mail.com', password: '' })
      .then((response) => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('message', `Username or password is wrong`)
        done()
      })
      .catch((err) => {
        done(err)
      })
  })
})
