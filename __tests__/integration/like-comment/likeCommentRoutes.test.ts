import { DataSource } from 'typeorm';
import request from 'supertest';
import {
  mockedCommentRequest,
  mockedCommentUpdateRequest,
  mockedLoginRequest,
  mockedLoginRequestTwo,
  mockedPostRequest,
  mockedUserRequest,
  mockedUserRequestTwo,
} from '../../mocks';
import app from '../../../src/app';
import AppDataSource from '../../../src/data-source';

interface IParams {
  userId: string;
  username: string;
  textComment: string;
  postId: string;
  token: string;
  tokenDelete: string;
  commentId: string;
  commentDeleteId: string;
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
    const createUserDelete = await request(app)
      .post('/users')
      .send(mockedUserRequestTwo);
    const createToken = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const createTokenDelete = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
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
      .send(mockedCommentUpdateRequest);
    await request(app)
      .delete(`/comments/${createCommentDelete.body.id}`)
      .set('Authorization', `Bearer ${createToken.body.token}`);
    await request(app)
      .delete(`/users/${createUserDelete.body.id}`)
      .set('Authorization', `Bearer ${createTokenDelete.body.token}`);

    params = {
      userId: createUser.body.id,
      username: createUser.body.username,
      textComment: createComment.body.text,
      postId: createPost.body.id,
      token: createToken.body.token,
      tokenDelete: createTokenDelete.body.token,
      commentId: createComment.body.id,
      commentDeleteId: createCommentDelete.body.id,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be possible to like the comment', async () => {
    const response = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('comment');
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('id');
    expect(response.body.comment).toHaveProperty('id');
    expect(response.body.comment).toHaveProperty('text');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body.comment.id).toEqual(params.commentId);
    expect(response.body.comment.text).toEqual(params.textComment);
    expect(response.body.user.id).toEqual(params.userId);
    expect(response.body.user.username).toEqual(params.username);
  });

  test('It should not be possible to like the comment with the invalid parameter', async () => {
    const response = await request(app)
      .post('/like/comment/123')
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to like the comment without authentication', async () => {
    const response = await request(app).post(
      `/like/comment/${params.commentId}`,
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to like the comment by a user that does not exist', async () => {
    const response = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to like the comment that does not exist', async () => {
    const response = await request(app)
      .post(`/like/comment/${params.commentDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to like the comment already liked', async () => {
    await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should be possible to delete like', async () => {
    const like = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .delete(`/like/comment/${like.body.id}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(204);
  });

  test('It should not be possible to delete the like with the invalid parameter', async () => {
    const response = await request(app)
      .delete('/like/comment/123')
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to delete the like without authentication', async () => {
    const like = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app).delete(`/like/comment/${like.body.id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to delete the like by a user that does not exist', async () => {
    const like = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .delete(`/like/comment/${like.body.id}`)
      .set('Authorization', `Bearer ${params.tokenDelete}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to delete the already deleted like', async () => {
    const like = await request(app)
      .post(`/like/comment/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);
    await request(app)
      .delete(`/like/comment/${like.body.id}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .delete(`/like/comment/${like.body.id}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });
});
