import { Router } from 'express';
import {
  deleteFollowController,
  followController,
} from '../controllers/follow.controller';

import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const followRoutes = Router();

followRoutes.post('/:id', ensureAuthMiddleware, followController);

followRoutes.delete('/:id', ensureAuthMiddleware, deleteFollowController);

export default followRoutes;
