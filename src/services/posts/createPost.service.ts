import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import { IPostRequest } from './../../interfaces/posts/index';

export const createPostService = async (postData: IPostRequest) => {

    const postsRepository = AppDataSource.getRepository(Post)

    /* const post = postsRepository.create(postData)
    await postsRepository.save(post)
 */
    return {post: "osfns"}
}