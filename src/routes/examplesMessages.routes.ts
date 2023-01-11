/* import { Router } from "express";
import {
  createMessageController,
  deleteMessageController,
  listMessageController,
  updateMessageController,
} from "../controllers/examplesMessages.controllers";
import ensureExampleAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureExampleMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { messageSerializer } from "../serializers/exampleMessage.serializes";

const exampleMessageRouter = Router();

exampleMessageRouter.post(
  "/messages",
  ensureExampleAuthMiddleware,
  ensureExampleMiddleware(messageSerializer),
  createMessageController
);
exampleMessageRouter.get("/messages", listMessageController);
exampleMessageRouter.patch("/messages/:id", updateMessageController);
exampleMessageRouter.delete("/messages/:id", deleteMessageController);

export default exampleMessageRouter;
 */