import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import User from '../entities/user.entities';
import AppError from '../errors/AppError';

const ensureUserIsPermitMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  
  if (req.params.id === req.user.id) {
    return next();
  }
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: req.user.id,
  });
  if (user.isAdm === false) {
    throw new AppError('only admins', 403);
  }

  return next();
};

export default ensureUserIsPermitMiddleware;

