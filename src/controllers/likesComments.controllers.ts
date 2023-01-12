import { Request, Response } from 'express';
import createLikeCommentService from '../services/likeComments/createLikeComment.service';
import deleteLikeCommentService from '../services/likeComments/deleteLikeComment.service';

const createLikeCommentController = async (req: Request, res: Response) => {
  const like = await createLikeCommentService(req.params.id, req.user.id);
  return res.status(201).json(like);
};

const deleteLikeCommentController = async (req: Request, res: Response) => {
  await deleteLikeCommentService(req.params.id, req.user.id);
  return res.status(204).json({});
};

export { createLikeCommentController, deleteLikeCommentController };
