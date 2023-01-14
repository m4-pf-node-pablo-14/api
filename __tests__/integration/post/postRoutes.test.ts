import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';
import {
  mockedPostRequest,
  mockedLoginRequest,
  mockedUserRequest,
  mockedUserRequestTwo,
  mockedLoginRequestTwo,
  mockedPostUpdateRequest,
} from '../../mocks';

interface IParams {
  userId: string;
  userTwoId: string;
  username: string;
  token: string;
  tokenUserTwo: string;
  postId: string;
  postTwoId: string;
  postDeleteId: string;
}

describe('Tests routes /posts', () => {
  let connection: DataSource;
  let params: IParams;

  beforeEach(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    const user = await request(app).post('/users').send(mockedUserRequest);
    const userTwo = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);

    const authorization = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const authorizationUserTwo = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);

    const post = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedPostRequest);
    const postTwo = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authorizationUserTwo.body.token}`)
      .send(mockedPostRequest);
    const postDelete = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedPostRequest);
    await request(app)
      .delete(`/posts/${postDelete.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`);

    params = {
      userId: user.body.id,
      userTwoId: userTwo.body.id,
      username: user.body.username,
      token: authorization.body.token,
      tokenUserTwo: authorizationUserTwo.body.token,
      postId: post.body.id,
      postTwoId: postTwo.body.id,
      postDeleteId: postDelete.body.id,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be possible to create a post', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedPostRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('img');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('updateAt');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.img).toEqual('kausdgas54dsf6s');
    expect(response.body.description).toEqual('postado');
    expect(response.body.user.id).toEqual(params.userId);
    expect(response.body.user.username).toEqual(params.username);
  });

  test('It should not be possible to create a post without authentication', async () => {
    const response = await request(app).post('/posts').send(mockedPostRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to create a post by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedPostRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to create a post without an image or description, it must have one or the other', async () => {
    const response = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to list posts without authentication', async () => {
    const response = await request(app).get('/posts').send();

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to list posts by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .get('/posts')
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should be possible to update a post', async () => {
    const response = await request(app)
      .patch(`/posts/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedPostUpdateRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('img');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updateAt');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.description).toEqual('Olá,Mundo!');
    expect(response.body.user.id).toEqual(params.userId);
    expect(response.body.user.username).toEqual(params.username);
  });

  test('It should not be possible to update a post without authentication', async () => {
    const response = await request(app)
      .patch(`/posts/${params.postId}`)
      .send(mockedPostUpdateRequest);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to update a post from another user', async () => {
    const response = await request(app)
      .patch(`/posts/${params.postTwoId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedPostUpdateRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to update a post that does not exist', async () => {
    const response = await request(app)
      .patch(`/posts/${params.postDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('It should be possible to delete a post', async () => {
    const response = await request(app)
      .delete(`/posts/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.status).toBe(204);
  });

  test('It should not be possible to delete a post without authentication', async () => {
    const response = await request(app)
      .delete(`/posts/${params.postTwoId}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to delete a post from another user', async () => {
    const response = await request(app)
      .delete(`/posts/${params.postTwoId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to delete a post that does not exist', async () => {
    const response = await request(app)
      .delete(`/posts/${params.postDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
