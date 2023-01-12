import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import Post from '../../entities/posts.entities';
import User from '../../entities/user.entities';


const listPostUserService = async (tokenId: string) => {
  const postRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);
   // .innerJoinAndSelect('follow.user','user')
  const posts =  await postRepository.createQueryBuilder('posts')
    .innerJoinAndSelect('posts.user','user')
    .where('posts.userId = :tokenId', { tokenId })
    .getMany();

  return posts;
};

export default listPostUserService;