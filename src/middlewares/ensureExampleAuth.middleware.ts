import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import 'dotenv/config';

const ensureExampleAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError('no token sent');
  }
  const token = authorization.split(' ')[1];
  return jwt.verify(
    token,
    process.env.SECRET_KEY,
    (err: jwt.VerifyErrors, decoded: jwt.JwtPayload) => {
      if (err) {
        throw new AppError(err.message);
      }
      req.user = {
        id: decoded.sub,
      };
      return next();
    },
  );
};

export default ensureExampleAuthMiddleware;
