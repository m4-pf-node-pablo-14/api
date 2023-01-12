import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import User from '../../entities/user.entities';

const listUsersWithSameFollowerService = async (tokenId: string): Promise<User[]> => {

  const userRepository = AppDataSource.getRepository(User);
  const userQueryBuilder = userRepository.createQueryBuilder('users');

  const users = await userQueryBuilder
    .leftJoinAndSelect(Follow, 'follow', 'follow.followersId = users.id')
    .where('follow.followersId = :tokenId', { tokenId })
    .getMany();

  return users;
};

export default listUsersWithSameFollowerService;
