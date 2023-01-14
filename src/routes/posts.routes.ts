import { postRequestSerializer } from './../serializers/posts.serializers';
import { Router } from 'express';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensurePostDataExistsMiddleware from '../middlewares/ensurePostDataExists.middleware';
import {
  createPostsController,
  deletePostController,
  listPostByIdController,
  listPostsController,
  updatePostsController,
} from '../controllers/posts.controller';

const postRouter = Router();

postRouter.post(
  '',
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(postRequestSerializer),
  ensurePostDataExistsMiddleware,
  createPostsController,
);

postRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(postRequestSerializer),
  ensurePostDataExistsMiddleware,
  updatePostsController,
);

postRouter.get('', ensureAuthMiddleware, listPostsController);

postRouter.delete('/:id', ensureAuthMiddleware, deletePostController);

postRouter.get('/:id', ensureAuthMiddleware, listPostByIdController)

export default postRouter;
