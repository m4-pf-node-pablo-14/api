import { NextFunction, Request, Response } from 'express';
import AppDataSource from '../data-source';
import User from '../entities/user.entities';
import AppError from '../errors/AppError';

const ensureUserIsExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => { 
  console.log("chegou aqui")
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: req.user.id,
  });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  console.log("e aqui")
  return next();
};

export default ensureUserIsExistMiddleware;
