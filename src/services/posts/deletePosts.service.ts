import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';
import { IReqUser } from '../../interfaces/users.interfaces';

const deletePostService = async (
  postToDeleteId: string,
  reqUser: IReqUser,
): Promise<{}> => {
  const postsRepository: Repository<Post> = AppDataSource.getRepository(Post);

  const postToDelete: Post = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .where('posts.id = :postId', { postId: postToDeleteId })
    .getOne();

  if (postToDelete.user.id === reqUser.id) {
    await postsRepository.remove(postToDelete);
    return {};
  }

  if (!reqUser.isAdm) {
    throw new AppError(
      'user does not have permission to delete this post',
      403,
    );
  }

  await postsRepository.remove(postToDelete);
  return {};
};

export default deletePostService;
