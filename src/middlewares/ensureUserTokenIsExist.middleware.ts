import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import User from '../entities/user.entities';
import AppError from '../errors/AppError';

const ensureUserTokenIsExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: req.user.id,
  });

  if (!user) {
    throw new AppError('user does not have permission', 403);
  }

  return next();
};

export default ensureUserTokenIsExistMiddleware;
