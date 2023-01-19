import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';

const retrievePostService = async (postId: string): Promise<Post> => {
  const post: Post = await AppDataSource.getRepository(Post)
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

  return post;
};

export default retrievePostService;
