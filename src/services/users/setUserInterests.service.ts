import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Likes from '../../entities/likes.entities';
import User from '../../entities/user.entities';
import { countInterests } from '../../scripts/interests.scripts';

const setUserInterestsService = async (userId: string): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const latestLikes: Likes[] = await AppDataSource.getRepository(Likes)
    .createQueryBuilder('likes')
    .innerJoin('likes.user', 'user')
    .innerJoinAndSelect('likes.post', 'post')
    .leftJoinAndSelect('post.interestsPost', 'interestPost')
    .innerJoinAndSelect('interestPost.interest', 'interest')
    .where('user.id = :userId', { userId: userId })
    .orderBy('likes.createdAt', 'DESC')
    .limit(20)
    .getMany();

  const userInterests = countInterests(latestLikes);

  const user: User = await userRepository.findOneBy({
    id: userId,
  });

  user.mainInterest = userInterests.mainInterest.mainInterestName;
  user.recentInterest = userInterests.recentInterest.recentInterestName;

  await userRepository.save(user);
};

export default setUserInterestsService;
