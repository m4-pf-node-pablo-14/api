import { DataSource } from 'typeorm';
import request from 'supertest';
import {
  mockedLoginRequest,
  mockedLoginRequestAdm,
  mockedUserRequest,
  mockedUserRequestAdm,
  mockedUserRequestTwo,
} from '../../mocks';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';

interface IParams {
  userId: string;
  userAdmId: string;
  userDeleteId: string;
  token: string;
  tokenAdm: string;
}

describe("/follow", () => {
  let connection: DataSource;
  let params: IParams;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
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
    };
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST - /follow - Should be able to follow the user", async () => {
    const response = await request(app)
      .post(`/follow/${params.userId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(201);
  });

  test('Must not be able to follow the user without authentication', async () => {
    const response = await request(app)
      .post(`/follow/${params.userAdmId}`)
      .send();

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('Should not be able to follow user that does not exist', async () => {
    const response = await request(app)
      .post(`/follow/${params.userDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('Should not be able to follow the user they already follow', async () => {
    const response = await request(app)
      .post(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('You must not be able to follow yourself', async () => {
    const response = await request(app)
      .post(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It must be possible to unfollow the user', async () => {
    const responseTwo = await request(app)
      .delete(`/follow/${params.userId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(responseTwo.status).toBe(204);
  });

  test('Must not be able to unfollow the user without authentication', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userAdmId}`)
      .send();

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('Should not be able to unfollow user that does not exist', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('You must not be able to unfollow the user you do not follow', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('You must not be able to unfollow yourself', async () => {
    const response = await request(app)
      .delete(`/follow/${params.userAdmId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
