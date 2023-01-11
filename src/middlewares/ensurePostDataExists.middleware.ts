import { IPostRequest } from './../interfaces/posts/index';
import { NextFunction, Request, Response } from 'express';

export const ensurePostDataExistsMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const postData: IPostRequest = req.body
    const keys = Object.keys(postData) 

    console.log(keys)

    return next
}