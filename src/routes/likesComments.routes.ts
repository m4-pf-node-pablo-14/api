import {
  createLikeCommentController,
  deleteLikeCommentController,
} from './../controllers/likesComments.controllers';
import { Router } from 'express';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureUserIsExistMiddleware from '../middlewares/ensureUserIsExist.middleware';

const likesCommentsRouter = Router();

likesCommentsRouter.post(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  createLikeCommentController,
);

likesCommentsRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  deleteLikeCommentController,
);

export default likesCommentsRouter;
