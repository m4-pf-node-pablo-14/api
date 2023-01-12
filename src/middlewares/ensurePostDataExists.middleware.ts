import { IPostRequest } from '../interfaces/posts.interfaces';
import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

const ensurePostDataExistsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postData: IPostRequest = req.body;
  const keys = Object.keys(postData);

  if (!keys[0]) {
    throw new AppError('img or description fild needs to have content', 400);
  }

  return next();
};

export default ensurePostDataExistsMiddleware;
