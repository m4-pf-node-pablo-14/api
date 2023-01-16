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
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('username');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('bio');
    expect(response.body).not.toHaveProperty('password');
    expect(response.body).toHaveProperty('address');
    expect(response.body.address).toHaveProperty('id');
    expect(response.body.address).toHaveProperty('district');
    expect(response.body.address).toHaveProperty('zipCode');
    expect(response.body.address).toHaveProperty('number');
    expect(response.body.address).toHaveProperty('city');
    expect(response.body.address).toHaveProperty('state');
    expect(response.body.email).toEqual('vinicius123@hotmail.com');
    expect(response.body.username).toEqual('vini123');
    expect(response.body.name).toEqual('vinicius');
    expect(response.body.last_name).toEqual('quirino');
    expect(response.body.bio).toEqual('Dev Senior');
    expect(response.body.address.district).toEqual('Rua Jerusalém');
    expect(response.body.address.zipCode).toEqual('62280000');
    expect(response.body.address.number).toEqual('72');
    expect(response.body.address.city).toEqual('Santa Quitéria');
    expect(response.body.address.state).toEqual('CE');
  });
});
