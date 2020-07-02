import mongoose from 'mongoose';

import request from 'supertest';
import app from '../../src/app';

import UserFactory from '../util/UserFactory';
import User from '../../src/app/schemas/User';

let data = null;
let token = null;

describe('User', () => {
  afterAll(async () => {
    await User.deleteMany({});

    await mongoose.connection.close();
  });

  it('should not be able to sign up', async () => {
    const user = new User();

    const response = await request(app)
      .post('/api/signup')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to sign up', async () => {
    const user = await UserFactory.build('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/api/signup')
      .send(user);

    data = response.body;

    expect(response.status).toBe(200);
  });

  it('should not be able to sign in', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: data.email,
      });

    token = response.body.token;

    expect(response.status).toBe(400);
  });

  it('should be able to sign in', async () => {
    const response = await request(app)
      .post('/api/signin')
      .send({
        email: data.email,
        password: '123456',
      });

    token = response.body.token;

    expect(response.body).toHaveProperty('user');
  });

  it('should be able to sign out', async () => {
    const response = await request(app)
      .post('/api/signout')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
  });
});
