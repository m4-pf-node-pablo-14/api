import { DataSource } from 'typeorm';
import request from 'supertest';
import AppDataSource from '../../../src/data-source';
import app from '../../../src/app';
import {
  mockedPostRequest,
  mockedLoginRequest,
  mockedUserRequest,
  mockedCommentRequest,
  mockedUserRequestTwo,
  mockedLoginRequestTwo,
  mockedCommentUpdateRequest,
  mockedUserRequestAdm,
  mockedLoginRequestAdm,
} from '../../mocks';

interface IParams {
  userId: string;
  username: string;
  token: string;
  tokenTwo: string;
  tokenAdm: string;
  postId: string;
  postDescription: string;
  postDeleteId: string;
  commentId: string;
  commentTwoId: string;
  commentDeleteId: string;
}

describe('Tests routes /comments', () => {
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
    await request(app).post('/users').send(mockedUserRequestTwo);
    await request(app).post('/users').send(mockedUserRequestAdm);
    const authorization = await request(app)
      .post('/login')
      .send(mockedLoginRequest);
    const authorizationTwo = await request(app)
      .post('/login')
      .send(mockedLoginRequestTwo);
    const authorizationAdm = await request(app)
      .post('/login')
      .send(mockedLoginRequestAdm);
    const post = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedPostRequest);
    const postDelete = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedPostRequest);
    const comment = await request(app)
      .post(`/comments/${post.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedCommentRequest);
    const commentTwo = await request(app)
      .post(`/comments/${post.body.id}`)
      .set('Authorization', `Bearer ${authorizationTwo.body.token}`)
      .send(mockedCommentRequest);
    const commentDelete = await request(app)
      .post(`/comments/${post.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`)
      .send(mockedCommentRequest);
    await request(app)
      .delete(`/posts/${postDelete.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`);
    await request(app)
      .delete(`/comments/${commentDelete.body.id}`)
      .set('Authorization', `Bearer ${authorization.body.token}`);

    params = {
      userId: user.body.id,
      username: user.body.username,
      token: authorization.body.token,
      tokenTwo: authorizationTwo.body.token,
      tokenAdm: authorizationAdm.body.token,
      postId: post.body.id,
      postDescription: post.body.description,
      postDeleteId: postDelete.body.id,
      commentId: comment.body.id,
      commentTwoId: commentTwo.body.id,
      commentDeleteId: commentDelete.body.id,
    };
  });

  afterEach(async () => {
    await connection.destroy();
  });

  test('It should be possible to create a comment on the post', async () => {
    const response = await request(app)
      .post(`/comments/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentRequest);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('text');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body).toHaveProperty('post');
    expect(response.body.post).toHaveProperty('img');
    expect(response.body.post).toHaveProperty('description');
    expect(response.body.post).toHaveProperty('id');
    expect(response.body.text).toEqual('lindo');
    expect(response.body.user.id).toEqual(params.userId);
    expect(response.body.user.username).toEqual(params.username);
    expect(response.body.post.id).toEqual(params.postId);
    expect(response.body.post.description).toEqual(params.postDescription);
  });

  test('It should not be possible to create a comment on the post with the invalid parameter', async () => {
    const response = await request(app)
      .post('/comments/123')
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentRequest);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to create a comment on the post without authentication', async () => {
    const response = await request(app)
      .post(`/comments/${params.postId}`)
      .send(mockedCommentRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be possible to create a comment on the post by a user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .post(`/comments/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to create a comment on the post that does not exist', async () => {
    const response = await request(app)
      .post(`/comments/${params.postDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should not be possible to create a comment on the post without an text', async () => {
    const response = await request(app)
      .post(`/comments/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should be possible to delete the post comment', async () => {
    const response = await request(app)
      .delete(`/comments/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(204);
  });

  test('It should be possible for the owner of the post to delete the comment', async () => {
    const response = await request(app)
      .delete(`/comments/${params.commentTwoId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(204);
  });

  test('It should be possible for the admin user to delete the comment', async () => {
    const response = await request(app)
      .delete(`/comments/${params.commentId}`)
      .set('Authorization', `Bearer ${params.tokenAdm}`);

    expect(response.status).toBe(204);
  });

  test('It should not be possible to delete the comment on the post with the invalid parameter', async () => {
    const response = await request(app)
      .delete('/comments/123')
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to delete the post comment without authentication', async () => {
    const response = await request(app).delete(`/comments/${params.commentId}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(401);
  });

  test('It should not be possible to delete the post comment from another user', async () => {
    const response = await request(app)
      .delete(`/comments/${params.commentId}`)
      .set('Authorization', `Bearer ${params.tokenTwo}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to delete a comment on post by user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .delete(`/comments/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to delete comment that does not exist from a post', async () => {
    const response = await request(app)
      .delete(`/comments/${params.commentDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(404);
  });

  test('It should be possible to update a comment on the post', async () => {
    const response = await request(app)
      .patch(`/comments/${params.commentId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('text');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user).toHaveProperty('username');
    expect(response.body.user).not.toHaveProperty('password');
    expect(response.body).toHaveProperty('post');
    expect(response.body.post).toHaveProperty('img');
    expect(response.body.post).toHaveProperty('description');
    expect(response.body.post).toHaveProperty('id');
    expect(response.body.text).toEqual('Parabéns!');
    expect(response.body.user.id).toEqual(params.userId);
    expect(response.body.user.username).toEqual(params.username);
    expect(response.body.post.id).toEqual(params.postId);
    expect(response.body.post.description).toEqual(params.postDescription);
  });

  test('It should not be possible to update a comment on the post with the invalid parameter', async () => {
    const response = await request(app)
      .patch('/comments/123')
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentUpdateRequest);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to update a comment on the post without authentication', async () => {
    const response = await request(app)
      .patch(`/comments/${params.commentId}`)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to update a comment by another user on the post', async () => {
    const response = await request(app)
      .patch(`/comments/${params.commentTwoId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to update a comment on post by user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .patch(`/comments/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentUpdateRequest);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to update a comment that does not exist from a post', async () => {
    const response = await request(app)
      .patch(`/comments/${params.commentDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send(mockedCommentUpdateRequest);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to update a comment on the post without an text', async () => {
    const response = await request(app)
      .patch(`/comments/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`)
      .send();

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to list the comments in the post with the invalid parameter', async () => {
    const response = await request(app)
      .get('/comments/post/123')
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('error');
    expect(response.status).toBe(400);
  });

  test('It should not be possible to list the comments in the post without authentication', async () => {
    const response = await request(app).get(`/comments/post/${params.postId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('It should not be possible to list the comments in the post by user that does not exist', async () => {
    await request(app)
      .delete(`/users/${params.userId}`)
      .set('Authorization', `Bearer ${params.token}`);
    const response = await request(app)
      .get(`/comments/post/${params.postId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.body).toHaveProperty('message');
    expect(response.status).toBe(403);
  });

  test('It should not be possible to list the comments in the post that does not exist', async () => {
    const response = await request(app)
      .get(`/comments/post/${params.postDeleteId}`)
      .set('Authorization', `Bearer ${params.token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
