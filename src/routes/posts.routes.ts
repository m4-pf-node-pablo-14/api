import { createPostController } from './../controllers/posts.controllers';
import { postRequestSerializer } from './../serializers/posts.serializers';
import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

const postsRouter = Router();

postsRouter.post(
  '',
  /* ensureDataIsValidMiddleware(postRequestSerializer), */
  createPostController
);

export default postsRouter;