const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('user creation', () => {
  test('valid user can be created', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('user without username returns 400', async () => {
    const newUser = {
      name: 'Test User',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('username too short returns 400', async () => {
    const newUser = {
      username: 'ab',
      name: 'Test User',
      password: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('password too short returns 400', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'ab'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('duplicate username returns 400', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'password123'
    }

    await api.post('/api/users').send(newUser)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})