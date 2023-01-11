import { Router } from 'express';
import { createLikePostController } from '../controllers/likePost.controller';

const likePostRouter: Router = Router();

//falta verificar a autenticao com midware
likePostRouter.post('', createLikePostController);

export default likePostRouter;
