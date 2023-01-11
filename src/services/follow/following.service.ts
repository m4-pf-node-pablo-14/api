import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { followRequest } from '../../interfaces/follow.interfaces';

const followService = async (data: followRequest): Promise<void> => {
  const followRepository = AppDataSource.getRepository(Follow);

  const find = await followRepository.findOne({
    where: {
      following: { id: data.following },
      followers: { id: data.followers },
    },
  });

  if (find) {
    throw new AppError('You already follow this user', 404);
  }

  const userRepository = AppDataSource.getRepository(User);
  const userFollowing = await userRepository.findOneBy({ id: data.following });
  const userFollowers = await userRepository.findOneBy({ id: data.followers });

  const newFollow = followRepository.create({
    following: userFollowing,
    followers: userFollowers,
  });

  await followRepository.save(newFollow);
};

export default followService;
