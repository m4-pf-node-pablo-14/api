import AppDataSource from '../../data-source';
import Likes from '../../entities/likes.entities';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';

const listPostsLikesService = async (
  userId: string,
  tokenId: string,
): Promise<Post[]> => {
  const postRepository = AppDataSource.getRepository(Post);
  const postQueryBuilder = postRepository.createQueryBuilder('posts');

  if (userId !== tokenId) {
    throw new AppError('only your comments', 403);
  }

  const posts = await postQueryBuilder
    .leftJoinAndSelect(Likes, 'likes', 'likes.postId = posts.id')
    .where('likes.userId = :userId', { userId })
    .getMany();

  return posts;
};

export default listPostsLikesService;
