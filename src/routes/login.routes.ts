import { Router } from 'express';
import { createLoginController } from '../controllers/login.controllers';
import ensureDataIsValidMiddleware from '../middlewares/ensureDataIsValid.middleware';
import { userLoginSerializer } from '../serializers/user.serializes';

const loginRouter: Router = Router();

loginRouter.post(
  '',
  ensureDataIsValidMiddleware(userLoginSerializer),
  createLoginController,
);

export default loginRouter;
