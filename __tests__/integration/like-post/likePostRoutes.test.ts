import request from 'supertest';
import { DataSource } from 'typeorm';
import app from '../../../src/app';
import AppDataSource from '../../../src/data-source';
import {
  mockedLoginRequest,
  mockedLoginRequestTwo,
  mockedPostRequest,
  mockedPostUpdateRequest,
  mockedUserRequest,
  mockedUserRequestTwo,
} from '../../mocks';

interface IParams {
  createToken: string;
  img: string;
  description: string;
  tokenDelete: string;
  createPost: string;
  postDeleteId: string;
  userId: string;
  username: string;
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

    const user = await request(app).post('/users').send(mockedUserRequest);
    const userDelete = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);
    const createToken = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const tokenDelete = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
    const createPost = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${createToken.body.token}`)
      .send(mockedPostRequest);
    const postDelete = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${createToken.body.token}`)
      .send(mockedPostUpdateRequest);
    await request(app)
      .delete(`/users/${userDelete.body.id}`)
      .set('Authorization', `Bearer ${tokenDelete.body.token}`);
    await request(app)
      .delete(`/posts/${postDelete.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`);

    params = {
      createToken: createToken.body.token,
      img: createPost.body.img,
      description: createPost.body.description,
      tokenDelete: tokenDelete.body.token,
      createPost: createPost.body.id,
      postDeleteId: postDelete.body.id,
      userId: user.body.id,
      username: user.body.username,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be possible to like the post', async () => {
    const response = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('post');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('id');
    expect(response.body.post).toHaveProperty('id');
    expect(response.body.post).toHaveProperty('img');
    expect(response.body.post).toHaveProperty('description');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.post.id).toEqual(params.createPost);
    expect(response.body.post.img).toEqual(params.img);
    expect(response.body.post.description).toEqual(params.description);
    expect(response.body.user.id).toEqual(params.userId);
    expect(response.body.user.username).toEqual(params.username);
  });

  test('It should not be possible to like the post with the invalid parameter', async () => {
    const response = await request(app)
      .post('/like/post/123')
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to like the post without authentication', async () => {
    const response = await request(app).post(`/like/post/${params.createPost}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to like the post by a user that does not exist', async () => {
    const response = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to like the post that does not exist', async () => {
    const response = await request(app)
      .post(`/like/post/${params.postDeleteId}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to like the post already liked', async () => {
    await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should be possible to delete like', async () => {
    const createLikePost = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app)
      .delete(`/like/post/${createLikePost.body.id}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.status).toBe(204);
  });

  test('It should not be possible to delete the like with the invalid parameter', async () => {
    const response = await request(app)
      .delete('/like/post/123')
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('it should not be possible to delete the like without authentication', async () => {
    const createLikePost = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app).delete(
      `/like/post/${createLikePost.body.id}`,
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to delete the like by a user that does not exist', async () => {
    const like = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app)
      .delete(`/like/post/${like.body.id}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to delete the already deleted like', async () => {
    const like = await request(app)
      .post(`/like/post/${params.createPost}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    await request(app)
      .delete(`/like/post/${like.body.id}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app)
      .delete(`/like/post/${like.body.id}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
