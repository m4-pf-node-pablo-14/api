import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';

const listUserPostsService = async (tokenId: string): Promise<Post[]> => {
  const postRepository = AppDataSource.getRepository(Post);
  const posts = await postRepository
    .createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user', 'user')
    .where('posts.userId = :tokenId', { tokenId })
    .getMany();

  return posts;
};

export default listUserPostsService;
