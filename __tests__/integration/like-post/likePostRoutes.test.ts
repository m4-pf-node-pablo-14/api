import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../src/app';
import AppDataSource from '../../../src/data-source';
import {
  mockedLoginRequest,
  mockedPostRequest,
  mockedUserRequest,
} from '../../mocks';

interface IParams {
  createToken: string;
  createPost: string;
}

describe('/like/post/:id', () => {
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

    await request(app).post('/users').send(mockedUserRequest);
    const createToken = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const createPost = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${createToken.body.token}`)
      .send(mockedPostRequest);

    params = {
      createToken: createToken.body.token,
      createPost: createPost.body.id,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be possible to like the post', async () => {
    const createLikePost = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(createLikePost.body).toHaveProperty('createdAt');
    expect(createLikePost.status).toBe(201);
  });

  test('It should not be possible to like the post without authentication', async () => {
    const createLikePost = await request(app).post(
      `/like/post/${params.createPost}`,
    );

    expect(createLikePost.status).toBe(400);
    expect(createLikePost.body).toHaveProperty('message');
  });

  test('It should be possible to delete like', async () => {
    const createLikePost = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const deleteLikePost = await request(app)
      .delete(`/like/post/${createLikePost.body.id}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(deleteLikePost.status).toBe(204);
  });

  test('it should not be possible to delete the like without authentication', async () => {
    const createLikePost = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const deleteLikePost = await request(app).delete(
      `/like/post/${createLikePost.body.id}`,
    );

    expect(deleteLikePost.status).toBe(400);
    expect(deleteLikePost.body).toHaveProperty('message');
  });
});