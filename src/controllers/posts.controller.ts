import { Request, Response } from 'express';
import createPostsService from '../services/posts/createPosts.service';
import updatePostsService from '../services/posts/updatePosts.service';
import listPostsService from '../services/posts/listPosts.service';
import deletePostService from '../services/posts/deletePosts.service';

const createPostsController = async (req: Request, res: Response) => {
  const post = await createPostsService(req.body, req.user.id);
  return res.status(201).json(post);
};

const updatePostsController = async (req: Request, res: Response) => {
  const post = await updatePostsService(req.body, req.params.id, req.user.id);
  return res.json(post);
};

const listPostsController = async (req: Request, res: Response) => {
  const posts = await listPostsService(req.query);
  return res.json(posts);
};

const deletePostController = async (req: Request, res: Response) => {
  await deletePostService(req.params.id, req.user.id);
  return res.status(204).json({});
};

export {
  createPostsController,
  updatePostsController,
  listPostsController,
  deletePostController,
};
