import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';

const retrievePostService = async (postId: string) => {
  const post = await AppDataSource.getRepository(Post)
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

export default retrievePostService;
