import { Request, Response } from 'express';
import createLikePostService from '../services/likePost/createLikePost.service';

const createLikePostController = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const postId = req.params.postId;
  const like = await createLikePostService(userId, postId);

  return res.status(201).json(like);
};

export { createLikePostController };
