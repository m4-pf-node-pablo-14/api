import { commentRequestSerializer } from "../serializers/comments.serializers";
import { Router } from "express";
import {
  createCommentsController,
  deleteCommentController,
  updateCommentController,
} from "../controllers/comments.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

const commentRouter = Router();

commentRouter.post(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  createCommentsController
);

commentRouter.delete("/:id", ensureAuthMiddleware, deleteCommentController);

commentRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(commentRequestSerializer),
  updateCommentController
);

export default commentRouter;
