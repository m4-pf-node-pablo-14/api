import { Router } from 'express';
import {
  deleteFollowController,
  followController,
} from '../controllers/follow.controller';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const followRouter = Router();

followRouter.post('/:id', ensureAuthMiddleware, followController);

followRouter.delete('/:id', ensureAuthMiddleware, deleteFollowController);

export default followRouter;
