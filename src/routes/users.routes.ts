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
  '/followers',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowerController,
);

userRouter.get(
  '/following',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowingController,
);

userRouter.get(
  '/posts',
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
  '/postsLiked',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsLikedController,
);

userRouter.patch(
  '',
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
