import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import User from '../entities/user.entities';
import AppError from '../errors/AppError';

const ensureUserIsExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: req.user.id,
  });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return next();
};

export default ensureUserIsExistMiddleware;
