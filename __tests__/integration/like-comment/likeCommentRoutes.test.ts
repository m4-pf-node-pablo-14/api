import { DataSource } from 'typeorm';
import request from 'supertest';
import {
  mockedCommentRequest,
  mockedLoginRequest,
  mockedPostRequest,
  mockedUserRequest,
} from '../../mocks';
import app from '../../../src/app';
import AppDataSource from '../../../src/data-source';

interface IParams {
  createToken: string;
  createPost: string;
  createComment: string;
}

describe('/like/comment/:id', () => {
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
    const createComment = await request(app)
      .post(`/comments/${createPost.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`)
      .send(mockedCommentRequest);

    params = {
      createToken: createToken.body.token,
      createPost: createPost.body.id,
      createComment: createComment.body.id,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be possible to like the comment', async () => {
    const createLikeComment = await request(app)
      .post(`/like/comment/${params.createComment}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(createLikeComment.body).toHaveProperty('comment');
    expect(createLikeComment.status).toBe(201);
  });

  test('It should not be possible to like the post without authentication', async () => {
    const createLikeComment = await request(app).post(
      `/like/comment/${params.createComment}`,
    );

    expect(createLikeComment.status).toBe(401);
    expect(createLikeComment.body).toHaveProperty('message');
  });

  test('It should be possible to delete like', async () => {
    const createLikeComment = await request(app)
      .post(`/like/comment/${params.createComment}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app)
      .delete(`/like/comment/${createLikeComment.body.id}`)
      .set('Authorization', `Bearer ${params.createToken}`);

    expect(response.status).toBe(204);
  });

  test('it should not be possible to delete the like without authentication', async () => {
    const createLikeComment = await request(app)
      .post(`/like/comment/${params.createComment}`)
      .set('Authorization', `Bearer ${params.createToken}`);
    const response = await request(app).delete(
      `/like/comment/${createLikeComment.body.id}`,
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });
});
