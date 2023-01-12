import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';

const listUsersFollowingService = async (
  tokenId: string,
): Promise<Follow[]> => {
  const followRepository = AppDataSource.getRepository(Follow);

  const following = await followRepository
    .createQueryBuilder('follow')
    .where('follow.following = :tokenId', { tokenId })
    .getMany();

  return following;
};

export default listUsersFollowingService;
