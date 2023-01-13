import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source';
import request from 'supertest';
import app from '../../../app';
import {
  mockedLoginRequest,
  mockedUserRequest,
  mockedUserRequestTwo,
} from '../../mocks';

describe('/follow', () => {
  let connection: DataSource;

  interface IObject {
    createUserTwo: null | string;
    authorization: null | string;
  }

  const object: IObject = {
    createUserTwo: null,
    authorization: null,
  };

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

    object.createUserTwo = createUserTwo.body.id;
    object.authorization = authorization.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should be able to follow the user', async () => {
    const response = await request(app)
      .post(`/follow/${object.createUserTwo}`)
      .set('Authorization', `Bearer ${object.authorization}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(201);
  });

  test('It must be possible to unfollow the user', async () => {
    const responseTwo = await request(app)
      .delete(`/follow/${object.createUserTwo}`)
      .set('Authorization', `Bearer ${object.authorization}`);

    expect(responseTwo.status).toBe(204);
  });
});
