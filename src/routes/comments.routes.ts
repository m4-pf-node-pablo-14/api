import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  listCommentsByPostController,
  updateCommentController,
} from '../controllers/comments.controller';
import Comment from '../entities/comments.entities';
import Post from '../entities/posts.entities';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureItIsExistMiddleware from '../middlewares/ensureItIsExist.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { commentRequestSerializer } from '../serializers/comments.serializers';
import { idSerializer } from '../serializers/params.serializers';

const commentRouter: Router = Router();

commentRouter.post(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(Post),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  createCommentController,
);

commentRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(Comment),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deleteCommentController,
);

commentRouter.patch(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(Comment),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  updateCommentController,
);

commentRouter.get(
  '/post/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(Post),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listCommentsByPostController,
);

export default commentRouter;
