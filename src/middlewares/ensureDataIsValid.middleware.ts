import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';
import AppError from '../errors/AppError';

const ensureDataIsValidMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = req.body;
      if (!message) {
        throw new AppError('message was not sent');
      }
      const messageValidated = await schema.validate(message, {
        abortEarly: false,
        stripUnknown: true,
      });
      req.body = messageValidated;
      return next();
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
  };

export default ensureDataIsValidMiddleware;
