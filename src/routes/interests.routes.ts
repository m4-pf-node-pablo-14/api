import {
  createInterestController,
  deleteInterestController,
  listInterestsController,
} from './../controllers/interests.controllers';
import { Router } from 'express';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';
import ensureUserTokenIsExistMiddleware from '../middlewares/ensureUserTokenIsExist.middleware';
import ensureParamsIdIsValidMiddleware from '../middlewares/ensureParamsIdIsValid.middleware';
import { idSerializer } from '../serializers/params.serializers';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import { interestRequestSerializer } from '../serializers/interests.serializers';
import ensureItIsExistMiddleware from '../middlewares/ensureItIsExist.middleware';
import Interest from '../entities/interests.entities';

const interestRouter: Router = Router();

interestRouter.post(
  '',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  ensureDataIsValidMiddleware(interestRequestSerializer),
  createInterestController,
);

interestRouter.delete(
  '/:id',
  ensureParamsIdIsValidMiddleware(idSerializer),
  ensureItIsExistMiddleware(Interest),
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  deleteInterestController,
);

interestRouter.get(
  '',
  ensureAuthMiddleware,
  ensureUserTokenIsExistMiddleware,
  listInterestsController,
);

export default interestRouter;
