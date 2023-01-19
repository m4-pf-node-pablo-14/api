import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import InterestsPost from '../../entities/interestsPost.entities';

const removeInterestsToPostService = async (postId: string): Promise<void> => {
  const interestsPostRepository: Repository<InterestsPost> =
    AppDataSource.getRepository(InterestsPost);

  const interestsPostArray: InterestsPost[] = await interestsPostRepository
    .createQueryBuilder('interestsPost')
    .leftJoin('interestsPost.post', 'post')
    .where('post.id = :postId', { postId: postId })
    .getMany();

  interestsPostArray.forEach(async (interestPost) => {
    await interestsPostRepository.remove(interestPost);
  });
};

export default removeInterestsToPostService;
