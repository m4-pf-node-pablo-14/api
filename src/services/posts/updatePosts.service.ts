import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IPostRequest } from '../../interfaces/post.interfaces';

const updatePostsService = async (
  data: IPostRequest,
  postId: string,
  userId: string,
) => {
  const postsRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });
  const findPost = await postsRepository
    .createQueryBuilder('Post')
    .innerJoinAndSelect('Post.users', 'User')
    .where('Post.id = :id', { id: postId })
    .getOne();

  if (userId !== findPost.user.id) {
    throw new AppError('You don\'t have permission', 400);
  }

  if (!findUser) {
    throw new AppError('User not found', 404);
  }
  if (!findPost) {
    throw new AppError('Post not found', 404);
  }

  const newPost = await postsRepository.save({
    ...findPost,
    ...data,
    user: findUser,
  });

  return newPost;
};

export default updatePostsService;
