import { Request, Response } from 'express';
import createCommentsService from '../services/comments/createComments.service';

const createCommentsController = async (req: Request, res: Response) => {
  const postId = req.params.id;

  const post = await createCommentsService(postId, req);

  return res.status(201).json(post);
};

export { createCommentsController };
