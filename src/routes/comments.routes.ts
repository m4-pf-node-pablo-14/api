import { Router } from 'express';
import { createCommentsController } from '../controllers/comments.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const commentRouter = Router();

commentRouter.post('', ensureAuthMiddleware, createCommentsController);

export default commentRouter;