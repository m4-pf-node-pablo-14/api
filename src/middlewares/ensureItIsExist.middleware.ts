import { NextFunction, Request, Response } from 'express';
import { EntityTarget } from 'typeorm';
import AppDataSource from '../data-source';
import Comment from '../entities/comments.entities';
import Interest from '../entities/interests.entities';
import Post from '../entities/posts.entities';
import User from '../entities/user.entities';
import AppError from '../errors/AppError';

const ensureItIsExistMiddleware =
  (entity: EntityTarget<User | Post | Comment | Interest>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const find: User | Post | Comment | Interest =
      await AppDataSource.getRepository(entity).findOneBy({
        id: req.params.id,
      });

      if (!find) {
        throw new AppError('Not found', 404);
      }

      return next();
    };

export default ensureItIsExistMiddleware;
