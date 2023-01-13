import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listPostsLikesController,
  listPostsUsersController,
  listUsersCommentsController,
  listUsersController,
  listUsersFollowerController,
  listUsersFollowingController,
  listUsersWithSameFollowerController,
  updateUsersController,
} from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureUserIsExistMiddleware from "../middlewares/ensureUserIsExist.middleware";
import { userSerializer, userUpdateSerializer } from "../serializers/user.serializes";

const userRouter = Router();

userRouter.post("", ensureDataIsValidMiddleware(userSerializer), createUserController);

userRouter.get("", ensureAuthMiddleware, ensureUserIsExistMiddleware, listUsersController);

userRouter.get(
  "/followers",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersController
);

userRouter.get(
  "/following",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowerController
);

userRouter.get(
  "/posts",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersFollowingController
);
userRouter.get(
  "/posts",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listPostsUsersController
);

userRouter.get(
  "/comments",
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  listUsersCommentsController
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
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(userUpdateSerializer),
  updateUsersController
);

userRouter.delete("/:id", ensureAuthMiddleware, ensureUserIsExistMiddleware, deleteUserController);

export default userRouter;
