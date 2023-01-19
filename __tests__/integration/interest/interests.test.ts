import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';
import {
  mockedLoginRequest,
  mockedUserRequest,
  mockedUserRequestTwo,
  mockedLoginRequestTwo,
  mockedInterestRequest,
} from '../../mocks';

interface IParams {
  token: string;
  tokenDelete: string;
  interestId: string;
  interestTwoId: string;
  interestDeleteId: string;
}

describe('Tests routes /interests', () => {
  let connection: DataSource;
  let params: IParams;

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
    const authorization = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const authorizationDelete = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
    const interest = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedInterestRequest);
    const interestTwo = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send({ name: 'Kenzie' });
    const interestDelete = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send({ name: 'NodeJs' });
    await request(app)
      .delete(`/users/${userDelete.body.id}`)
      .set('Authorization', `Bearer ${authorizationDelete.body.token}`);
    await request(app)
      .delete(`/interests/${interestDelete.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`);

    params = {
      token: authorization.body.token,
      tokenDelete: authorizationDelete.body.token,
      interestId: interest.body.id,
      interestTwoId: interestTwo.body.id,
      interestDeleteId: interestDelete.body.id,
    };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('It should be possible to create a interest', async () => {
    const response = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${params.token}`)
      .send({ name: 'Futebol' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual('Futebol');
  });

  test('It should not be possible to create a interest without authentication', async () => {
    const response = await request(app)
      .post('/interests')
      .send({ name: 'Programação' });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be possible to create a interest by a user that does not exist', async () => {
    const response = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${params.tokenDelete}`)
      .send({ name: 'TypeScript' });

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to create a interest that already exists', async () => {
    const response = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedInterestRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(409);
  });

  test('It should not be possible to create a interest without an name', async () => {
    const response = await request(app)
      .post('/interests')
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should be possible to delete a interest', async () => {
    const response = await request(app)
      .delete(`/interests/${params.interestId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(204);
  });

  test('It should not be possible to delete a interest with the invalid parameter', async () => {
    const response = await request(app)
      .delete('/interests/123')
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to delete a interest without authentication', async () => {
    const response = await request(app).delete(
      `/interests/${params.interestTwoId}`,
    );

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be possible to delete a interest by user that does not exist', async () => {
    const response = await request(app)
      .delete(`/interests/${params.interestTwoId}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to delete a interest that does not exist', async () => {
    const response = await request(app)
      .delete(`/interests/${params.interestDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to list the interests without authentication', async () => {
    const response = await request(app).get('/interests/');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to list the interests by user that does not exist', async () => {
    const response = await request(app)
      .get('/interests/')
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
