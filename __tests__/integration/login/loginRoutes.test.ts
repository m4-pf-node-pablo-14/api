import request from 'supertest';
import app from '../../../src/app';
import AppDataSource from '../../../src/data-source';
import { DataSource } from 'typeorm';
import {
  mockedLoginRequest,
  mockedLoginRequestTwo,
  mockedUserRequest,
  mockedUserRequestTwo,
} from '../../mocks';

describe('test routes /login', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    await request(app).post('/users').send(mockedUserRequest);
    const userDelete = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);
    const tokenDelete = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
    await request(app)
      .delete(`/users/${userDelete.body.id}`)
      .set('Authorization', `Bearer ${tokenDelete.body.token}`);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Must be able to login', async () => {
    const response = await request(app).post('/login').send(mockedLoginRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('Should not be able to login with the user with incorrect password or email', async () => {
    const response = await request(app).post('/login').send({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('Should not be able to login with the user with date in deleteAt', async () => {
    const response = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
