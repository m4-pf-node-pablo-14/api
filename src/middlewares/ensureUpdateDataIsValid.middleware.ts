import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import AppError from '../errors/AppError';
import { IUserUpdate } from '../interfaces/users.interfaces';

const ensureUpdateDataIsValidMiddleware =
  (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const userData: IUserUpdate = req.body;

      const keys: string[] = Object.keys(userData);

      if (!keys[0]) {
        throw new AppError('body must be passed');
      }

      try {
        const userValidated = await schema.validate(userData, {
          abortEarly: false,
          stripUnknown: false,
        });

        req.body = userValidated;

        return next();
      } catch (err) {
        return res.status(400).json({ message: err.errors });
      }
    };

export default ensureUpdateDataIsValidMiddleware;
