import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';

const followService = async (
  followingId: string,
  followersId: string,
): Promise<void> => {
  const followRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);

  const find: Follow = await followRepository.findOne({
    where: {
      following: { id: followingId },
      followers: { id: followersId },
    },
  });

  if (find) {
    throw new AppError('You already follow this user', 403);
  }

  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const userFollowing: User = await userRepository.findOneBy({
    id: followingId,
  });
  const userFollowers: User = await userRepository.findOneBy({
    id: followersId,
  });

  const newFollow: Follow = followRepository.create({
    following: userFollowing,
    followers: userFollowers,
  });

  await followRepository.save(newFollow);
};

export default followService;
