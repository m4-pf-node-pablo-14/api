import { Router } from 'express';
import {
  createPostsController,
  deletePostController,
  listPostsByInterestController,
  listPostsController,
  retrievePostController,
  updatePostsController,
} from '../controllers/posts.controller';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensurePostDataExistsMiddleware from '../middlewares/ensurePostDataExists.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { postRequestSerializer } from '../serializers/posts.serializers';

const postRouter = Router();

postRouter.post(
  '',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(postRequestSerializer),
  ensurePostDataExistsMiddleware,
  createPostsController,
);

postRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(postRequestSerializer),
  ensurePostDataExistsMiddleware,
  updatePostsController,
);

postRouter.get(
  '',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listPostsController,
);

postRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deletePostController,
);

postRouter.get(
  '/:id',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  retrievePostController,
);

postRouter.get(
  '/interest/:interestName',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listPostsByInterestController
)

export default postRouter;
