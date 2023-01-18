import { INewUser } from './../../interfaces/users.interfaces';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { mergeUserCountArrays, mergeUsersAndRows } from '../../scripts/users.scripts';
import { userResponserSerializer } from '../../serializers/user.serializes';


const retrieveUserService = async (userId: string): Promise<INewUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const find = await userRepository.findOne({
    where: { id: userId },
    relations: { address: true },
  });

  if (!find) {
    throw new AppError('User not found');
  }
  const validatedUser = await userResponserSerializer.validate(find, {
    stripUnknown: true,
  });

  const postsCount = await userRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect('users.posts', 'posts')
    .where('users.id = :userId', {userId:userId})
    .orderBy('users.createdAt')
    .select('users.id')
    .addSelect('COUNT(posts)', 'postsCount')
    .groupBy('users.id')
    .getRawMany();

  const followersCount = await userRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect('users.followers', 'followers')
    .where('users.id = :userId', {userId:userId})
    .orderBy('users.createdAt')
    .select('users.id')
    .addSelect('COUNT(followers)', 'followersCount')
    .groupBy('users.id')
    .getRawMany();

  const followingCount = await userRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect('users.following', 'following')
    .where('users.id = :userId', {userId:userId})
    .orderBy('users.createdAt')
    .select('users.id')
    .addSelect('COUNT(following)', 'followingCount')
    .groupBy('users.id')
    .getRawMany();

  const postsAndFollowersCountArray = mergeUserCountArrays(
    postsCount,
    followersCount,
  );

  const rowsOfCount = mergeUserCountArrays(
    postsAndFollowersCountArray,
    followingCount,
  );

  const newUser = mergeUsersAndRows([validatedUser], rowsOfCount);

  return newUser[0];
};

export default retrieveUserService;
