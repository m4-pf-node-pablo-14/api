import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';
import { IPostRequest } from '../../interfaces/posts.interfaces';

const updatePostsService = async (
  postData: IPostRequest,
  postToUpdateId: string,
  requesterUserId: string,
): Promise<Post> => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postToUpdate = await postsRepository
    .createQueryBuilder('Post')
    .innerJoinAndSelect('Post.users', 'User')
    .where('Post.id = :id', { id: postToUpdateId })
    .getOne();

  if (requesterUserId !== postToUpdate.user.id) {
    throw new AppError('You don\'t have permission', 401);
  }

  if (!postToUpdate) {
    throw new AppError('Post not found', 404);
  }

  const newPost = await postsRepository.save({ ...postToUpdate, ...postData });

  return newPost;
};

export default updatePostsService;
