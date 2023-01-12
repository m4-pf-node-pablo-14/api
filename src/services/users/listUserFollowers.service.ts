import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';


const listUserFollowersService = async (tokenId: string) => {
  const followRepository = AppDataSource.getRepository(Follow);
 
 
  const followers =  await followRepository.createQueryBuilder('follow')
    .where('follow.followers = :tokenId', { tokenId })
    .getMany();

  return followers;
};

export default listUserFollowersService;