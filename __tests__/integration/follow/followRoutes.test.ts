import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';
import {
  mockedLoginRequest,
  mockedLoginRequestAdm,
  mockedLoginRequestTwo,
  mockedUserRequest,
  mockedUserRequestAdm,
  mockedUserRequestTwo,
} from '../../mocks';

interface IParams {
  userId: string;
  userAdmId: string;
  userDeleteId: string;
  token: string;
  tokenAdm: string;
  tokenDelete: string;
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

    const user = await request(app).post('/users').send(mockedUserRequest);
    const userAdm = await request(app)
      .post('/users')
      .send(mockedUserRequestAdm);
    const userDelete = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);
    const authorization = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const authorizationAdm = await request(app)
      .post('/login')
      .send(mockedLoginRequestAdm);
    const authorizationDelete = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
    await request(app)
      .post(`/follow/${userAdm.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`);
    await request(app)
      .delete(`/users/${userDelete.body.id}`)
      .set('Authorization', `Bearer ${authorizationAdm.body.token}`);

    params = {
      userId: user.body.id,
      userAdmId: userAdm.body.id,
      userDeleteId: userDelete.body.id,
      token: authorization.body.token,
      tokenAdm: authorizationAdm.body.token,
      tokenDelete: authorizationDelete.body.token,
    };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('It should be able to follow the user', async () => {
    const response = await request(app)
      .post(`/follow/${params.userId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(201);
  });

  test('It should not be able to follow the user with the invalid parameter', async () => {
    const response = await request(app)
      .post('/follow/123')
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be able to follow the user without authentication', async () => {
    const response = await request(app).post(`/follow/${params.userAdmId}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be able to follow the user by a user that does not exist', async () => {
    const response = await request(app)
      .post(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be able to follow the user that does not exist', async () => {
    const response = await request(app)
      .post(`/follow/${params.userDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be able to follow the user they already follow', async () => {
    const response = await request(app)
      .post(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be able to follow yourself', async () => {
    const response = await request(app)
      .post(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should be able to unfollow the user', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.status).toBe(204);
  });

  test('It should not be able to unfollow the user with the invalid parameter', async () => {
    const response = await request(app)
      .delete('/follow/123')
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be able to unfollow the user without authentication', async () => {
    const response = await request(app).delete(`/follow/${params.userAdmId}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be able to unfollow the user by a user that does not exist', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be able to unfollow the user that does not exist', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be able to unfollow the user you do not follow', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not not be able to unfollow yourself', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
