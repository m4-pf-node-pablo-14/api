import { Router } from 'express';
import {
  createLikePostController,
  deslikePostController,
} from '../controllers/likePost.controller';
import Post from '../entities/posts.entities';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureItIsExistMiddleware from '../middlewares/ensureItIsExist.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { idSerializer } from '../serializers/params.serializers';

const likePostRouter: Router = Router();

likePostRouter.post(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(Post),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  createLikePostController,
);

likePostRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deslikePostController,
);

export default likePostRouter;
