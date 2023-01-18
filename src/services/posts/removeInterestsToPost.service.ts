import AppDataSource from '../../data-source';
import InterestsPost from '../../entities/interestsPost.entities';

const removeInterestsToPostService = async (postId: string) => {
  const interestsPostRepository = AppDataSource.getRepository(InterestsPost);

  const interestsPostArray = await interestsPostRepository
    .createQueryBuilder('interestsPost')
    .leftJoin('interestsPost.post', 'post')
    .where('post.id = :postId', { postId: postId })
    .getMany();

  interestsPostArray.forEach(async (interestPost) => {
    await interestsPostRepository.remove(interestPost);
  });
};

export default removeInterestsToPostService;
