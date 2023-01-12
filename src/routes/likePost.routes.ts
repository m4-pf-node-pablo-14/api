import { Router } from 'express';
import { createLikePostController } from '../controllers/likePost.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const likePostRouter: Router = Router();

likePostRouter.post('/:id', ensureAuthMiddleware, createLikePostController);

export default likePostRouter;
