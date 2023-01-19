import { Router } from 'express';
import {
  deleteFollowController,
  followController,
} from '../controllers/follow.controller';
import User from '../entities/user.entities';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureFollowIsPermitMiddleware from '../middlewares/ensureFollowIsPermit.middleware';
import ensureItIsExistMiddleware from '../middlewares/ensureItIsExist.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import { idSerializer } from '../serializers/params.serializers';

const followRouter: Router = Router();

followRouter.post(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureFollowIsPermitMiddleware,
  followController,
);

followRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(User),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureFollowIsPermitMiddleware,
  deleteFollowController,
);

export default followRouter;
