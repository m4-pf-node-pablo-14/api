import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const ensureFollowIsPermitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.params.id === req.user.id) {
    throw new AppError('user is not allowed to follow/unfollow', 403);
  }

  return next();
};

export default ensureFollowIsPermitMiddleware;
