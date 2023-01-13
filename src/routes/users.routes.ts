import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listPostsLikesController,
  listPostsUserController,
  listUserCommentsController,
  listUsersController,
  listUsersFollowerController,
  listUsersFollowingController,
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

userRouter.post("", ensureDataIsValidMiddleware(userSerializer), createUserController);

userRouter.get("", ensureAuthMiddleware, ensureUserIsExistMiddleware, listUsersController);

userRouter.get(
  "/followers",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserController,
);

userRouter.get(
  "/following",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserFollowersController,
);

userRouter.get(
  "/posts",
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
  "/comments",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserCommentsController
);

userRouter.get(
  "/recomendedFollows",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersWithSameFollowerController
);

userRouter.get(
  "/postsLiked",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsLikesController
);

userRouter.patch(
  '/:id',
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);

userRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  ensureUserIsPermitMiddleware,
  deleteUserController,
);

export default userRouter;
