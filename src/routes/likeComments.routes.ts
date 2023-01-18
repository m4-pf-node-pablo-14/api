import {
  createLikeCommentController,
  deleteLikeCommentController,
} from '../controllers/likesComments.controllers';
import { Router } from 'express';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import { idSerializer } from '../serializers/params.serializers';

const likeCommentRouter = Router();

likeCommentRouter.post(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  createLikeCommentController,
);

likeCommentRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deleteLikeCommentController,
);

export default likeCommentRouter;
