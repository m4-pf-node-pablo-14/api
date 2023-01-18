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
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import ensurePostDataExistsMiddleware from '../middlewares/ensurePostDataExists.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { idSerializer } from '../serializers/params.serializers';
import { postRequestSerializer } from '../serializers/posts.serializers';

const postRouter: Router = Router();

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
  ensureParamsIdIsValidMiddleware(idSerializer),
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
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deletePostController,
);

postRouter.get(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  retrievePostController,
);

postRouter.get(
  '/interest/:interestName',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listPostsByInterestController,
);

export default postRouter;
