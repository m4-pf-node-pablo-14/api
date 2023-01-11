import { listPostsService } from './../services/posts/listPosts.service';
import { createPostService } from './../services/posts/createPost.service';
import { IPostRequest } from './../interfaces/posts/index';
import { Request, Response } from 'express';

export const createPostController = async (req: Request,res: Response) => {
    console.log("chegou aqui")
    const postData: IPostRequest = req.body 
    const post = await createPostService(postData)
    return res.status(201).json(post)
}

export const listPostsController = async (req: Request,res: Response) => {
    const queryParams = req.query
    const page: string = req.params.page
    const posts = await listPostsService(queryParams, page)
    return res.status(200).json(posts)
}