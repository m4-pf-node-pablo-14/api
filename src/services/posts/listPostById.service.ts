import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';

export const listPostByIdService = async (postId: string) => {
  const postsRepository = AppDataSource.getRepository(Post);

  const post = await postsRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .leftJoinAndSelect('posts.likes', 'likes')
    .leftJoinAndSelect('posts.comments', 'comments')
    .leftJoinAndSelect('comments.likes', 'commentLikes')
    .where('posts.id = :postId', { postId: postId })
    .select([
      'posts',
      'user.id',
      'user.username',
      'likes',
      'comments',
      'commentLikes',
    ])
    .getOne();

  if (!post) {
    throw new AppError('post not found', 404);
  }

  return post;
};
