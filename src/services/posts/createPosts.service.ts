import { IPost } from './../../interfaces/posts.interfaces';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import Post from '../../entities/posts.entities';
import { IPostRequest } from '../../interfaces/posts.interfaces';
import { postSerializar } from '../../serializers/posts.serializers';

const createPostsService = async (
  postData: IPostRequest,
  requesterUserId: string,
): Promise<IPost> => {
  const postsRepository = AppDataSource.getRepository(Post);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: requesterUserId,
  });

  const post = postsRepository.create({ ...postData, user });

  await postsRepository.save(post);

  const validatedPost = await postSerializar.validate(post, {
    stripUnknown: true
  })

  return validatedPost;
};

export default createPostsService;
