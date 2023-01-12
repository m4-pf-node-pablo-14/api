import { Router } from 'express';
import {
  createLikePostController,
  deslikePostController,
} from '../controllers/likePost.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const likePostRouter: Router = Router();

likePostRouter.post('/:id', ensureAuthMiddleware, createLikePostController);
likePostRouter.delete('/:id', ensureAuthMiddleware, deslikePostController);

export default likePostRouter;
