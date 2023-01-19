import { IPost } from './../../interfaces/posts.interfaces';
import AppDataSource from '../../data-source';
import { IPostRequest } from '../../interfaces/posts.interfaces';
import { postSerializar } from '../../serializers/posts.serializers';
import { getInterests } from '../../scripts/interests.scripts';
import Post from '../../entities/posts.entities';
import User from '../../entities/user.entities';
import insertInterestsToPostService from './insertInterestsToPost.service';
import { Repository } from 'typeorm';

const createPostsService = async (
  postData: IPostRequest,
  requesterUserId: string,
): Promise<IPost> => {
  const user: User = await AppDataSource.getRepository(User).findOneBy({
    id: requesterUserId,
  });

  const postsRepository: Repository<Post> = AppDataSource.getRepository(Post);

  const post: Post = postsRepository.create({ ...postData, user });

  await postsRepository.save(post);

  const interestsArray: string[] = getInterests(post.description);

  await insertInterestsToPostService(interestsArray, post.id);

  return await postSerializar.validate(post, {
    stripUnknown: true,
  });
};

export default createPostsService;
