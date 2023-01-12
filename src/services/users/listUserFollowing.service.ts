import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';


const listUserFollowingService = async (tokenId: string) => {
  const followRepository = AppDataSource.getRepository(Follow);
 
 
  const following =  await followRepository.createQueryBuilder('follow')
    .where('follow.following = :userId', { tokenId })
    .getMany();

  return following;
};

export default listUserFollowingService;