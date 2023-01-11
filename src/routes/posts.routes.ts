import { postRequestSerializer } from './../serializers/posts.serializers';
import { ensurePostDataExistsMiddleware } from './../middlewares/ensurePostDataExists.middleware';
import { listPostsController } from '../controllers/posts.controller';
import { Router } from 'express';
import { createPostsController, updatePostsController } from '../controllers/posts.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';

const postRouter = Router();

postRouter.post('', ensureAuthMiddleware, ensureDataIsValidMiddleware(postRequestSerializer), ensurePostDataExistsMiddleware, createPostsController);
postRouter.patch('/:id', ensureAuthMiddleware, ensureDataIsValidMiddleware(postRequestSerializer), ensurePostDataExistsMiddleware, updatePostsController);
postRouter.get('', listPostsController)

export default postRouter;