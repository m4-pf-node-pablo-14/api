import { Router } from "express";
import {
  createUserController,
  dataProfileUserController,
  deleteUserController,
  listPostsLikedController,
  listUserCommentsController,
  listUserPostsController,
  listUsersController,
  listUsersFollowerController,
  listUsersFollowingController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import {
  ensureDataIsValidMiddleware,
  ensureUpdateDataIsValidMiddleware,
} from "../middlewares/ensureDataIsValid.middleware";
import ensureUserIsExistMiddleware from "../middlewares/ensureUserIsExist.middleware";
import ensureUserIsPermitMiddleware from "../middlewares/ensureUserIsPermit.middleware";
import { userSerializer, userUpdateSerializer } from "../serializers/user.serializes";

const userRouter = Router();

userRouter.post("", ensureDataIsValidMiddleware(userSerializer), createUserController);

userRouter.get("", ensureAuthMiddleware, ensureUserIsExistMiddleware, listUsersController);

userRouter.get(
  "/profile/:id",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  dataProfileUserController
);

userRouter.get(
  "/followers/:id",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowerController
);

userRouter.get(
  "/following/:id",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowingController
);

userRouter.get(
  "/posts/:id",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserPostsController
);

userRouter.get(
  "/comments",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUserCommentsController
);

userRouter.get(
  "/postsLiked",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsLikedController
);

userRouter.patch(
  "",
  ensureAuthMiddleware,
  ensureUpdateDataIsValidMiddleware(userUpdateSerializer),
  updateUserController
);

userRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureUserIsPermitMiddleware,
  ensureUserIsExistMiddleware,
  deleteUserController
);

export default userRouter;
