import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entities';
import InterestsPost from '../../entities/interestsPost.entities';
import Post from '../../entities/posts.entities';
import createInterestService from '../interests/createInterest.service';

const insertInterestsToPostService = async (
  interestsArray: string[],
  postId: string,
): Promise<{}> => {
  if (!interestsArray) {
    return {};
  }

  const post: Post = await AppDataSource.getRepository(Post).findOneBy({
    id: postId,
  });

  interestsArray.forEach(async (elem) => {
    let interest = await AppDataSource.getRepository(Interest).findOneBy({
      name: elem,
    });

    if (!interest) {
      interest = await createInterestService({ name: elem });
    }

    await AppDataSource.getRepository(InterestsPost).save({
      post,
      interest,
    });
  });
};

export default insertInterestsToPostService;
