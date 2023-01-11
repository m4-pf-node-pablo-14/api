import { Request, Response } from 'express';
import createUserService from '../services/users/createUser.service';
import deleteUserService from '../services/users/deleteUser.service';
import listUserService from '../services/users/listUser.service';
import { listUserCommentsService } from '../services/users/listUserComments.service';
import updateUserService from '../services/users/updateUser.service';

const createUserController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  return res.status(201).json(user);
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.json(users);
};

const listUserCommentsController = async (req: Request, res: Response) => {
  const data = await listUserCommentsService(req.user.id, req.params.id)
  return res.status(200).json(data)
};

const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserService(req.body, req.params.id);
  return res.json(user);
};

const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserService(req.params.id);
  return res.status(204).json({});
};

export {
  createUserController,
  listUserController,
  listUserCommentsController,
  updateUserController,
  deleteUserController,
};
