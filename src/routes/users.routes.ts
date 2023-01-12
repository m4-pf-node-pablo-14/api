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

userRouter.get('', ensureAuthMiddleware, listUserController);

userRouter.get(
  '/comments/:id',
  ensureAuthMiddleware,
  listUserCommentsController,
);

userRouter.get(
  '/recomendedFollows/:id',
  ensureAuthMiddleware,
  listUsersWithSameFollowerController,
);

userRouter.get(
  '/postsLiked/:id',
  ensureAuthMiddleware,
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
  ensureUserIsPermitMiddleware,
  deleteUserController,
);

export default userRouter;
