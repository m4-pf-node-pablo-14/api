import { insertInterestsToPostService } from './insertInterestsToPost.service';
import { IPost } from './../../interfaces/posts.interfaces';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import { IPostRequest } from '../../interfaces/posts.interfaces';
import { postSerializar } from '../../serializers/posts.serializers';
import { getInterests } from '../../scripts/interests.scripts';

const createPostsService = async (
  postData: IPostRequest,
  requesterUserId: string,
): Promise<IPost> => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: requesterUserId,
  });

  const postsRepository = AppDataSource.getRepository(Post);

  const post = postsRepository.create({ ...postData, user });

  await postsRepository.save(post);

  const validatedPost = await postSerializar.validate(post, {
    stripUnknown: true,
  });

  const interestsArray = getInterests(validatedPost.description)

  await insertInterestsToPostService(interestsArray, validatedPost.id)

  return validatedPost;
};

export default createPostsService;
