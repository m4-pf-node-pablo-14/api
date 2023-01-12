import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  listPostsLikesController,
  listUserCommentsController,
  listUserController,
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
