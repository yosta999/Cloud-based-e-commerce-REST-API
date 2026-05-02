const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-test-prod', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Product API', () => {
  it('should fetch all products without auth', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should fail to create product without auth', async () => {
    const res = await request(app).post('/api/products').send({
      name: 'Test Product',
      price: 100
    });
    expect(res.statusCode).toEqual(401);
  });
});
