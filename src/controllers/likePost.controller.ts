import { Request, Response } from 'express';
import createLikePostService from '../services/likePost/createLikePost.service';
import deslikePostService from '../services/likePost/deleteLikePost.service';

const createLikePostController = async (req: Request, res: Response) => {
  const like = await createLikePostService(req.user.id, req.params.id);
  return res.status(201).json(like);
};

const deslikePostController = async (req: Request, res: Response) => {
  await deslikePostService(req.user.id, req.params.id);
  return res.status(204).json({});
};

export { createLikePostController, deslikePostController };
