import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import { IPostRequest } from '../../interfaces/post.interfaces';

const createPostsService = async (data: IPostRequest, userId: string) => {
  const postsRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  const post = postsRepository.create({
    img: data.img,
    description: data.description,
    user: findUser,
  });

  await postsRepository.save(post);

  return post;
};

export default createPostsService;

