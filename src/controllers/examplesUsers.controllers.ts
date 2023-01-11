/* import { Request, Response } from 'express';
import createUserService from '../services/examples/users/createUser.service';
import listUserService from '../services/examples/users/listUser.service';

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const listUserController = async (req: Request, res: Response) => {
  const user = await listUserService();
  return res.json(user);
};

export { createUserController, listUserController };
 */