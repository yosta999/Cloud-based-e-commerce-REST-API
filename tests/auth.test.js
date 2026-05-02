const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../src/models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      password: 'password123'
    });
    expect(res.statusCode).toEqual(201);
  });

  it('should login and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      username: 'testuser',
      password: 'password123'
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });
});
