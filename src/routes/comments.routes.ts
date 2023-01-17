import { Router } from 'express';
import {
  createCommentController,
  deleteCommentController,
  listCommentsByPostController,
  updateCommentController,
} from '../controllers/comments.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import { ensureDataIsValidMiddleware } from '../middlewares/ensureDataIsValid.middleware';
import { commentRequestSerializer } from '../serializers/comments.serializers';


const commentRouter = Router();

commentRouter.post(
  '/:id',
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  createCommentController,
);

commentRouter.delete('/:id', ensureAuthMiddleware, deleteCommentController);

commentRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  updateCommentController,
);

commentRouter.get(
  '/post/:id',
  ensureAuthMiddleware,
  listCommentsByPostController,
);

export default commentRouter;
