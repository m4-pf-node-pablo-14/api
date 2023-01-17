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
  userId: string;
  token: string;
  postId: string;
  commentId: string;
  commentDeleteId: string;
  commentLikeId: string;
  likeCommentId: string;
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

    const createUser = await request(app)
      .post('/users')
      .send(mockedUserRequest);
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
    const createCommentDelete = await request(app)
      .post(`/comments/${createPost.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`)
      .send(mockedCommentRequest);
    const createCommentLike = await request(app)
      .post(`/comments/${createPost.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`)
      .send({
        text: '🚀',
      });
    const createLikeComment = await request(app)
      .post(`/like/comment/${createCommentLike.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`);
    await request(app)
      .delete(`/comments/${createCommentDelete.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`);

    params = {
      userId: createUser.body.id,
      token: createToken.body.token,
      postId: createPost.body.id,
      commentId: createComment.body.id,
      commentDeleteId: createCommentDelete.body.id,
      commentLikeId: createCommentLike.body.id,
      likeCommentId: createLikeComment.body.id,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  // test('It should be possible to like the comment', async () => {
  //   const response = await request(app)
  //     .post(`/like/comment/${params.commentId}`)
  //     .set('Authorization', `Bearer ${params.token}`);

  //   expect(response.status).toBe(201);
  // });

  test('It should not be possible to like the comment without authentication', async () => {
    const response = await request(app).post(
      `/like/comment/${params.commentId}`,
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to like the comment by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to like the comment that does not exist', async () => {
    const response = await request(app)
      .post(`/like/comment/${params.commentDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to like the comment already liked', async () => {
    const response = await request(app)
      .post(`/like/comment/${params.commentLikeId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should be possible to delete like', async () => {
    const response = await request(app)
      .delete(`/like/comment/${params.likeCommentId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(204);
  });

  test('It should not be possible to delete the like without authentication', async () => {
    const response = await request(app).delete(
      `/like/comment/${params.likeCommentId}`,
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to delete the like by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .delete(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to delete the like that does not exist', async () => {
    const response = await request(app)
      .delete(`/like/comment/${params.commentDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to delete the already deleted like', async () => {
    await request(app)
      .delete(`/like/comment/${params.commentLikeId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .delete(`/like/comment/${params.commentLikeId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });
});
