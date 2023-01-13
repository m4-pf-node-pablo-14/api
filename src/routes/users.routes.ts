import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  listPostsLikedController,
  listUserCommentsController,
  listUserPostsController,
  listUsersController,
  listUsersFollowerController,
  listUsersFollowingController,
  listUsersWithSameFollowerController,
  updateUserController,
} from '../controllers/users.controllers';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureUserIsExistMiddleware from '../middlewares/ensureUserIsExist.middleware';
import {
  userSerializer,
  userUpdateSerializer,
} from '../serializers/user.serializes';

const userRouter = Router();

userRouter.post(
  '',
  ensureDataIsValidMiddleware(userSerializer),
  createUserController,
);

userRouter.get(
  '',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersController,
);

userRouter.get(
  '/followers/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowerController,
);

userRouter.get(
  '/following/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowingController,
);

userRouter.get(
  '/posts/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserPostsController,
);

userRouter.get(
  '/comments',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserCommentsController,
);

userRouter.get(
  '/recomendedFollows',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersWithSameFollowerController,
);

userRouter.get(
  '/postsLiked',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsLikedController,
);

userRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController,
);

userRouter.delete(
  '',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  deleteUserController,
);

export default userRouter;
