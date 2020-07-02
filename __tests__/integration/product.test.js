import mongoose from 'mongoose';

import request from 'supertest';
import app from '../../src/app';

import ProductFactory from '../util/ProductFactory';
import Product from '../../src/app/schemas/Product';

let data = null;

describe('Product', () => {
  afterAll(async () => {
    await Product.deleteMany({});

    await mongoose.connection.close();
  });

  it('should be able to list', async () => {
    const response = await request(app)
      .get('/api/products')
      .send();

    expect(response.status).toBe(200);
  });

  it('should not be able to register', async () => {
    const product = new Product();

    const response = await request(app)
      .post('/api/products')
      .send(product);

    expect(response.status).toBe(400);
  });

  it('should be able to register', async () => {
    const product = await ProductFactory.build('Product', {});

    const response = await request(app)
      .post('/api/products')
      .send(product);

    data = response.body;

    expect(response.body).toHaveProperty('_id');
  });

  it('should not be able to product show', async () => {
    const { _id } = data;

    const response = await request(app)
      .get(`/api/products/${_id}1`)
      .send();

    expect(response.status).toBe(400);
  });

  it('should be able to update', async () => {
    const { _id } = data;

    const response = await request(app)
      .put(`/api/products/${_id}`)
      .send({
        name: 'Cadeira Trilon',
        description: 'Acento presidencial de couro e super confortável',
        category: 'Escritório',
        price: 999.0,
        amount: 100,
      });

    expect(response.body).toHaveProperty('_id');
  });

  it('should not be able to update', async () => {
    const { _id } = data;

    const response = await request(app)
      .put(`/api/products/${_id}1`)
      .send({
        name: 'Cadeira Trilon',
        description: 'Acento presidencial de couro e super confortável',
        category: 'Escritório',
        price: 999.0,
        amount: 100,
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to product deleted', async () => {
    const { _id } = data;

    const response = await request(app)
      .delete(`/api/products/${_id}1`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should be able to product deleted', async () => {
    const { _id } = data;

    const response = await request(app)
      .delete(`/api/products/${_id}`)
      .send();

    expect(response.status).toBe(200);
  });
});
