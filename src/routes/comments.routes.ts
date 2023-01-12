import { Router } from 'express';
import { createCommentsController, deleteCommentController } from '../controllers/comments.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const commentRouter = Router();

commentRouter.post('/:id', ensureAuthMiddleware, createCommentsController);
commentRouter.delete('/:id', ensureAuthMiddleware, deleteCommentController)

export default commentRouter;
