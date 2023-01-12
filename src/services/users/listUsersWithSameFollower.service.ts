import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import User from '../../entities/user.entities';

const listUsersWithSameFollowerService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userQueryBuilder = userRepository.createQueryBuilder('users');

  const users = await userQueryBuilder
    .leftJoinAndSelect(Follow, 'follow', 'follow.followersId = users.id')
    .where('follow.followersId = :userId', { userId })
    .getMany();

  return users;
};

export default listUsersWithSameFollowerService;
