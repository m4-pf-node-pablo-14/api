import { Router } from 'express';
import {
  createLikePostController,
  deslikePostController,
} from '../controllers/likePost.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';

const likePostRouter: Router = Router();

likePostRouter.post(
  '/:id',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  createLikePostController,
);

likePostRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deslikePostController,
);

export default likePostRouter;
