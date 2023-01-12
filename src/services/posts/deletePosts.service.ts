import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';

const deletePostService = async (
  postToDeleteId: string,
  requesterUserId: string,
): Promise<void> => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postToDelete = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .where('posts.id = :postId', { postId: postToDeleteId })
    .getOne();

  if (!postToDelete) {
    throw new AppError('post not found', 404);
  }

  if (postToDelete.user.id !== requesterUserId) {
    throw new AppError(
      'user does not have permission to delete this post',
      401,
    );
  }

  await postsRepository.remove(postToDelete);
};

export default deletePostService;