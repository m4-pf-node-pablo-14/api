import { Router } from 'express';
import {
  createPostsController,
  updatePostsController,
} from '../controllers/posts.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const postRouter = Router();

postRouter.post('', ensureAuthMiddleware, createPostsController);
postRouter.patch('/:id', ensureAuthMiddleware, updatePostsController);

export default postRouter;

export default postsRouter;