import { createPostService } from './../services/posts/createPost.service';
import { IPostRequest } from './../interfaces/posts/index';
import { Request, Response } from 'express';

export const createPostController = async (req: Request,res: Response) => {
    const postData: IPostRequest = req.body 
    const post = await createPostService(postData)
    return res.status(201).json(post)
}