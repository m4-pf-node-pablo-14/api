import { Router } from 'express';
import {
  createMessageController,
  deleteMessageController,
  listMessageController,
  updateMessageController,
} from '../controllers/examples.controllers';
import ensureExampleMiddleware from '../middlewares/ensureExample.middleware';
import { messageSerializer } from '../serializers/example.serializes';

const exampleRouter = Router();

exampleRouter.post(
  '',
  ensureExampleMiddleware(messageSerializer),
  createMessageController,
);
exampleRouter.get('', listMessageController);
exampleRouter.patch('/:id', updateMessageController);
exampleRouter.delete('/:id', deleteMessageController);

export default exampleRouter;
