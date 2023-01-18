import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const ensureParamsIdIsValidMiddleware =
  (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const idValidated = await schema.validate(req.params.id, {
          abortEarly: false,
          stripUnknown: true,
        });

        req.params.id = idValidated;

        return next();
      } catch (err) {
        return res.status(400).json({ error: err.errors });
      }
    };

export default ensureParamsIdIsValidMiddleware;
