import { Router } from 'express';
import {
  deleteFollowController,
  followController,
} from '../controllers/follow.controller';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureFollowIsPermitMiddleware from '../middlewares/ensureFollowIsPermit.middleware';

const followRouter = Router();

followRouter.post(
  '/:id',
  ensureAuthMiddleware,
  ensureFollowIsPermitMiddleware,
  followController,
);

followRouter.delete(
  '/:id',
  ensureAuthMiddleware,
  ensureFollowIsPermitMiddleware,
  deleteFollowController,
);

export default followRouter;
