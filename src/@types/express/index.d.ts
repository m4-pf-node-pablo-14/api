import * as express from 'express';
import { IReqUser } from '../../interfaces/users.interfaces';

declare global {
  namespace Express {
    interface Request {
      user: IReqUser;
    }
  }
}
