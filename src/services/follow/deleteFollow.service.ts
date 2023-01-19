import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Follow from '../../entities/follow.entities';
import AppError from '../../errors/AppError';

const deleteFollowService = async (followersId: string): Promise<void> => {
  const followRepository: Repository<Follow> =
    AppDataSource.getRepository(Follow);

  const find: Follow = await followRepository.findOne({
    where: { followers: { id: followersId } },
  });

  if (!find) {
    throw new AppError('You do not follow this user', 403);
  }

  await followRepository.remove(find);
};

export default deleteFollowService;
