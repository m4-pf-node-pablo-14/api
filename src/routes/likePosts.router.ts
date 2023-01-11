import { Router } from "express";
import { PostLikeController } from "../controllers/likePostsController";

export const postLikerouter: Router = Router();

//falta verificar a autenticao com midware 
postLikerouter.post("", PostLikeController);
