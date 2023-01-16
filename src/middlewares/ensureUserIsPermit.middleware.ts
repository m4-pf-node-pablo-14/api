import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const ensureUserIsPermitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.params.id === req.user.id) {
    return next();
  }

  if (!req.user.isAdm) {
    throw new AppError('only admins', 403);
  }

  return next();
};

export default ensureUserIsPermitMiddleware;
