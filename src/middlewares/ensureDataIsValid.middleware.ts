import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import AppError from "../errors/AppError";
import { IUserUpdate } from "../interfaces/users.interfaces";

const ensureDataIsValidMiddleware =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const message = req.body

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

const ensureUpdateDataIsValidMiddleware =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {

    const userData: IUserUpdate = req.body;
    const keys = Object.keys(userData);
  
    if (!keys[0]) {
      throw new AppError('body must be passed');
    }

    try {
      const messageValidated = await schema.validate(userData, {
        abortEarly: false,
        stripUnknown: false,
      });
      req.body = messageValidated;

      return next();
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }
  };

export { ensureDataIsValidMiddleware, ensureUpdateDataIsValidMiddleware };
