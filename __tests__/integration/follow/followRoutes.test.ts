import { DataSource } from 'typeorm';
import request from 'supertest';
import {
  mockedLoginRequest,
  mockedUserRequest,
  mockedUserRequestTwo,
} from '../../mocks';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';

interface IParams {
  createUserTwo: string;
  authorization: string;
}

describe('/follow', () => {
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
    const createUserTwo = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);
    const authorization = await request(app)
      .post('/login')
      .send(mockedLoginRequest);

    params = {
      createUserTwo: createUserTwo.body.id,
      authorization: authorization.body.token,
    };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should be able to follow the user', async () => {
    const response = await request(app)
      .post(`/follow/${params.createUserTwo}`)
      .set('Authorization', `Bearer ${params.authorization}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(201);
  });

  test('It must be possible to unfollow the user', async () => {
    const responseTwo = await request(app)
      .delete(`/follow/${params.createUserTwo}`)
      .set('Authorization', `Bearer ${params.authorization}`);

    expect(responseTwo.status).toBe(204);
  });
});
