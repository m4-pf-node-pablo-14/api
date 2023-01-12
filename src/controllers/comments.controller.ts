import { Request, Response } from 'express';
import createCommentsService from '../services/comments/createComments.service';

const createCommentsController = async (req: Request, res: Response) => {
  const post = await createCommentsService(
    req.params.id,
    req.body,
    req.user.id,
  );
  return res.status(201).json(post);
};

export { createCommentsController };
