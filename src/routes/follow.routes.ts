import { Router } from 'express';
import {
  deleteFollowController,
  followController,
} from '../controllers/follow.controller';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureFollowIsPermitMiddleware from '../middlewares/ensureFollowIsPermit.middleware';
import ensureUserIsExistMiddleware from '../middlewares/ensureUserIsExist.middleware';

const followRouter = Router();

followRouter.post(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  ensureFollowIsPermitMiddleware,
  followController,
);

followRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureUserIsExistMiddleware,
  ensureFollowIsPermitMiddleware,
  deleteFollowController,
);

export default followRouter;
