import { Router } from 'express';
import {
  createPostsController,
  deletePostController,
  listPostByIdController,
  listPostsController,
  updatePostsController,
} from '../controllers/posts.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensurePostDataExistsMiddleware from '../middlewares/ensurePostDataExists.middleware';
import ensureUserIsExistMiddleware from '../middlewares/ensureUserIsExist.middleware';
import { postRequestSerializer } from '../serializers/posts.serializers';


const postRouter = Router();

postRouter.post(
  '',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
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

postRouter.get(
  '',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsController,
);

postRouter.delete('/:id', ensureAuthMiddleware, deletePostController);

postRouter.get('/:id', ensureAuthMiddleware, listPostByIdController);

export default postRouter;
