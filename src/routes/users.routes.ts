import { Router } from 'express';
import {
  createUserController,
  retrieveUserController,
  deleteUserController,
  listPostsLikedController,
  listUserCommentsController,
  listUserPostsController,
  listUsersController,
  listUsersFollowerController,
  listUsersFollowingController,
  updateUserController,
} from '../controllers/users.controllers';
import User from '../entities/user.entities';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import ensureItIsExistMiddleware from '../middlewares/ensureItIsExist.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import ensureUpdateDataIsValidMiddleware from '../middlewares/ensureUpdateDataIsValid.middleware';
import ensureUserIsPermitMiddleware from '../middlewares/ensureUserIsPermit.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { idSerializer } from '../serializers/params.serializers';
import {
  userSerializer,
  userUpdateSerializer,
} from '../serializers/user.serializes';

const userRouter: Router = Router();

userRouter.post(
  '',
  ensureDataIsValidMiddleware(userSerializer),
  createUserController,
);

userRouter.get(
  '',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listUsersController,
);

userRouter.get(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  retrieveUserController,
);

userRouter.get(
  '/followers/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listUsersFollowerController,
);

userRouter.get(
  '/following/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listUsersFollowingController,
);

userRouter.get(
  '/posts/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listUserPostsController,
);

userRouter.get(
  '/comments/list',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listUserCommentsController,
);

userRouter.get(
  '/liked/posts',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listPostsLikedController,
);

userRouter.patch(
  '',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureUpdateDataIsValidMiddleware(userUpdateSerializer),
  updateUserController,
);

userRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureUserIsPermitMiddleware,
  deleteUserController,
);

export default userRouter;
