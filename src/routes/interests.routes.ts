import { createInterestController, deleteInterestController, listInterestsController } from './../controllers/interests.controllers';
import { Router } from 'express';
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const interestRouter: Router = Router();

interestRouter.post('', ensureAuthMiddleware, createInterestController);
interestRouter.delete('/:id', ensureAuthMiddleware, deleteInterestController)
interestRouter.get('', ensureAuthMiddleware, listInterestsController)

export default interestRouter;
