import { Request, Response } from 'express';
import createMessageService from '../services/examples/messages/createMessage.service';
import deleteMessageService from '../services/examples/messages/deleteMessage.service';
import listMessageService from '../services/examples/messages/listMessage.service';
import updateMessageService from '../services/examples/messages/updateMessage.service';

const createMessageController = async (req: Request, res: Response) => {
  const message = await createMessageService(req.body,req.user.id);
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
