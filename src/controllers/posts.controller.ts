import { IUserUpdate } from './../interfaces/users.interfaces';
import { IPostRequest } from './../interfaces/posts/index';
import { Request, Response } from 'express';
import { createPostsService } from '../services/posts/createPosts.service';
import { updatePostsService } from '../services/posts/updatePosts.service';
import { listPostsService } from '../services/posts/listPosts.service';

export const createPostsController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body 
  const requesterUserId: string = req.user.id
  const post = await createPostsService(postData, requesterUserId);
  return res.status(201).json(post);
};

export const updatePostsController = async (req: Request, res: Response) => {
  const postData: IPostRequest = req.body
  const postToUpdateId = req.params.id
  const requesterUserId = req.user.id
  const post = await updatePostsService(postData, postToUpdateId, requesterUserId);
  return res.status(200).json(post);
};

export const listPostsController = async (req: Request,res: Response) => {
  const queryParams = req.query
  const page: string = req.params.page
  const posts = await listPostsService(queryParams, page)
  return res.status(200).json(posts)
}
