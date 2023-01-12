import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import { IPostRequest } from '../../interfaces/posts';

export const createPostsService = async (postData: IPostRequest, requesterUserId: string): Promise<Post> => {
  const postsRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: requesterUserId,
  });

  const post = postsRepository.create({
    img: postData.img,
    description: postData.description,
    user
  });

  await postsRepository.save(post);

  return post;
};