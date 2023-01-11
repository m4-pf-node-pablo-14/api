import { ensurePostDataExistsMiddleware } from './../middlewares/ensurePostDataExists.middleware';
import { listPostsController } from '../controllers/posts.controller';
import { Router } from 'express';
import { createPostsController, updatePostsController } from '../controllers/posts.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const postRouter = Router();

postRouter.post('', ensureAuthMiddleware, ensurePostDataExistsMiddleware, createPostsController);
postRouter.patch('/:id', ensureAuthMiddleware, updatePostsController);
postRouter.get('', listPostsController)

export default postRouter;