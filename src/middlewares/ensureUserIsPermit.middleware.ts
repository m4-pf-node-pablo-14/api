import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const ensureUserIsPermitMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(req.params.id === req.user.id)) {
    throw new AppError('not allowed');
  }
  return next();
};

export default ensureUserIsPermitMiddleware;
