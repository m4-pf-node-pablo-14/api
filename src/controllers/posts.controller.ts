import { Request, Response } from 'express';
import createPostsService from '../services/posts/createPosts.service';
import updatePostsService from '../services/posts/updatePosts.service';


const createPostsController = async (req: Request, res: Response) => {
  
  const post = await createPostsService(req)

  return res.status(201).json(post)
};

const updatePostsController = async (req: Request, res: Response) => {

  const id = req.params.id

  const post =  await updatePostsService(req, id)

  return res.status(200).json(post)
}


export { createPostsController, updatePostsController };
