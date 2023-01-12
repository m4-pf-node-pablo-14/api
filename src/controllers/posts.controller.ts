import { Request, Response } from 'express';
import createPostsService from '../services/posts/createPosts.service';
import updatePostsService from '../services/posts/updatePosts.service';

const createPostsController = async (req: Request, res: Response) => {
  const post = await createPostsService(req.body, req.params.id);
  return res.status(201).json(post);
};

const updatePostsController = async (req: Request, res: Response) => {
  const post = await updatePostsService(req.body, req.params.id, req.user.id);
  return res.status(200).json(post);
};

export { createPostsController, updatePostsController };
