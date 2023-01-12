import { IPostRequest } from '../interfaces/posts.interfaces';
import { Request, Response } from 'express';
import createPostsService from '../services/posts/createPosts.service';
import updatePostsService from '../services/posts/updatePosts.service';
import listPostsService from '../services/posts/listPosts.service';
import deletePostService from '../services/posts/deletePosts.service';

export const createPostsController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body;
  const requesterUserId: string = req.user.id;
  const post = await createPostsService(postData, requesterUserId);
  return res.status(201).json(post);
};

export const updatePostsController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body;
  const postToUpdateId = req.params.id;
  const requesterUserId = req.user.id;
  const post = await updatePostsService(
    postData,
    postToUpdateId,
    requesterUserId,
  );
  return res.status(200).json(post);
};

export const listPostsController = async (req: Request, res: Response) => {
  const queryParams = req.query;
  const posts = await listPostsService(queryParams);
  return res.status(200).json(posts);
};

export const deletePostController = async (req: Request, res: Response) => {
  const postToDeleteId: string = req.params.id;
  const requesterUserId: string = req.user.id;
  await deletePostService(postToDeleteId, requesterUserId);
  return res.status(204).json({});
};
