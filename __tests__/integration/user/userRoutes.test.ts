import { DataSource } from 'typeorm';
import request from 'supertest';
import { mockedUserRequest } from '../../mocks';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';

describe('Tests routes /users', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Must be able to create a user', async () => {
    const response = await request(app).post('/users').send(mockedUserRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toBe('email');
    expect(response.body).toBe('username');
    expect(response.body).toBe('address');
    expect(response.body).toBe('last_name');
    expect(response.body.address).toBe('id');
    expect(response.body).toBe('city');
  });
});
