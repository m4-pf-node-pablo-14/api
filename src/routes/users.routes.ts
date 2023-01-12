import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  listPostsLikesController,
  listPostUserController,
  listUserCommentsController,
  listUserController,
  listUserFollowersController,
  listUserFollowingController,
  listUsersWithSameFollowerController,
  updateUserController,
} from '../controllers/users.controllers';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureUserIsExistMiddleware from '../middlewares/ensureUserIsExist.middleware';
import ensureUserIsPermitMiddleware from '../middlewares/ensureUserIsPermit.middleware';
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
  listUserController,
);
userRouter.get(
  '/followers',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserFollowersController,
);
userRouter.get(
  '/following',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserFollowingController,
);
userRouter.get(
  '/posts',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostUserController,
);

userRouter.get(
  '/comments/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserCommentsController,
);

userRouter.get(
  '/recomendedFollows/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersWithSameFollowerController,
);

userRouter.get(
  '/postsLiked/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsLikesController,
);

userRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsPermitMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController,
);

userRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  ensureUserIsPermitMiddleware,
  deleteUserController,
);

export default userRouter;
