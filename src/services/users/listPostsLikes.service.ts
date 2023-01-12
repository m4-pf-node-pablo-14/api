import AppDataSource from '../../data-source';
import Likes from '../../entities/likes.entities';
import Post from '../../entities/posts.entities';

const listPostsLikesService = async (tokenId: string): Promise<Post[]> => {
  const postRepository = AppDataSource.getRepository(Post);
  const postQueryBuilder = postRepository.createQueryBuilder('posts');

  const posts = await postQueryBuilder
    .leftJoinAndSelect(Likes, 'likes', 'likes.postId = posts.id')
    .where('likes.userId = :tokenId', { tokenId })
    .getMany();

  return posts;
};

export default listPostsLikesService;
