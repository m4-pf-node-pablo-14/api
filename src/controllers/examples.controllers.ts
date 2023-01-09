import { Request, Response } from 'express';
import createMessageService from '../services/examples/createMessage.service';
import deleteMessageService from '../services/examples/deleteMessage.service';
import listMessageService from '../services/examples/listMessage.service';
import updateMessageService from '../services/examples/updateMessage.service';

const createMessageController = async (req: Request, res: Response) => {
  const message = await createMessageService(req.body);
  return res.status(201).json(message);
};

const listMessageController = async (req: Request, res: Response) => {
  const messages = await listMessageService();
  return res.json(messages);
};

const updateMessageController = async (req: Request, res: Response) => {
  const message = await updateMessageService(req.params.id, req.body);
  return res.json(message);
};

const deleteMessageController = async (req: Request, res: Response) => {
  await deleteMessageService(req.params.id);
  return res.status(204).json({});
};

export {
  createMessageController,
  listMessageController,
  updateMessageController,
  deleteMessageController,
};
