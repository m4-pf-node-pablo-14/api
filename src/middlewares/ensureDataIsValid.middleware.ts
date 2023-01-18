import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const bodyValidated = await schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.body = bodyValidated;

        return next();
      } catch (err) {
        return res.status(400).json({ message: err.errors });
      }
    };

export default ensureDataIsValidMiddleware;
