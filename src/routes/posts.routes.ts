import { createPostController, listPostsController } from './../controllers/posts.controllers';
import { postRequestSerializer } from './../serializers/posts.serializers';
import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureAuthMiddleware from '../middlewares/ensureAuth.middleware';

const postsRouter = Router();

postsRouter.post(
  '',
  ensureDataIsValidMiddleware(postRequestSerializer),
  createPostController
);
postsRouter.get("/:page", listPostsController)

export default postsRouter;