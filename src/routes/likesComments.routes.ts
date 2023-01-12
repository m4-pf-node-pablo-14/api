import {
  createLikeCommentController,
  deleteLikeCommentController,
} from './../controllers/likesComments.controllers';
import { Router } from 'express';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const likesCommentsRouter = Router();

likesCommentsRouter.post(
  '/:id',
  ensureAuthMiddleware,
  createLikeCommentController,
);

likesCommentsRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  deleteLikeCommentController,
);

export default likesCommentsRouter;
