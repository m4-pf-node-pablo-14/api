import {
  mockedLoginRequestAdm,
  mockedLoginRequestTwo,
  mockedUpdateAdmUserRequest,
  mockedUpdateUserRequest,
  mockedUserRequest,
  mockedUserRequestAdm,
  mockedUserRequestTwo,
} from '../../mocks';
import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';

interface IUser {
  id: string;
  idAdm: string;
  token: string;
  tokenAdm: string;
}

describe('Tests routes /users', () => {
  let connection: DataSource;

  let dataUser: IUser;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    const userId = await request(app).post('/users').send(mockedUserRequestTwo);
    const userAdm = await request(app)
      .post('/users')
      .send(mockedUserRequestAdm);
    const userToken = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
    const tokenAdm = await request(app)
      .post('/login')
      .send(mockedLoginRequestAdm);

    dataUser = {
      id: userId.body.id,
      idAdm: userAdm.body.id,
      token: userToken.body.token,
      tokenAdm: tokenAdm.body.token,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be able to create a user', async () => {
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

  it('It should not be able to create a user that already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('message');
  });

  it('It should not be able to create a user missing information', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Lucas', email: 'lucasSOA@mail.com', password: '1234' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('It should not be able to list users without authentication', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to users posts by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.token}`);
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${dataUser.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to retrieve a user with the invalid parameter', async () => {
    const response = await request(app)
      .get('/users/123')
      .set('Authorization', `Bearer ${dataUser.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to retrieve a user without authentication', async () => {
    const response = await request(app).get(`/users/${dataUser.id}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be possible to retrieve a user by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.token}`);
    const response = await request(app)
      .get(`/users/${dataUser.idAdm}`)
      .set('Authorization', `Bearer ${dataUser.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to retrieve a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.tokenAdm}`);
    const response = await request(app)
      .get(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.tokenAdm}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  it('It should be able to update user', async () => {
    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${dataUser.token}`)
      .send(mockedUpdateUserRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.bio).toEqual('Hello');
    expect(response.body.address.city).toEqual('Lucas City');
    expect(response.body.address.state).toEqual('LS');
  });

  it('It should not be able to update id, isAdm, createdAt, updatedAt, deleteAt field value', async () => {
    const response = await request(app)
      .patch('/users')
      .set('Authorization', `Bearer ${dataUser.token}`)
      .send(mockedUpdateAdmUserRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('It should not be able to update user without authentication', async () => {
    const response = await request(app)
      .patch('/users')
      .send(mockedUpdateUserRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('It should be able to soft delete user', async () => {
    const response = await request(app)
      .delete(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.token}`);

    expect(response.status).toBe(204);
  });

  it('It should not be able to delete user without authentication', async () => {
    const response = await request(app).delete(`/users/${dataUser.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  it('It should not be able to delete user with date in deletedAt', async () => {
    await request(app)
      .delete(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.tokenAdm}`);
    const response = await request(app)
      .delete(`/users/${dataUser.id}`)
      .set('Authorization', `Bearer ${dataUser.tokenAdm}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
