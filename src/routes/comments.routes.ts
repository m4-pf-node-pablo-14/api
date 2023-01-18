import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  listCommentsByPostController,
  updateCommentController,
} from '../controllers/comments.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { commentRequestSerializer } from '../serializers/comments.serializers';
import { idSerializer } from '../serializers/params.serializers';

const commentRouter = Router();

commentRouter.post(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  createCommentController,
);

commentRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deleteCommentController,
);

commentRouter.patch(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  updateCommentController,
);

commentRouter.get(
  '/post/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listCommentsByPostController,
);

export default commentRouter;
