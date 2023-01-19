import insertInterestsToPostService from './insertInterestsToPost.service';
import { IPost } from './../../interfaces/posts.interfaces';
import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';
import { IPostRequest } from '../../interfaces/posts.interfaces';
import { postSerializar } from '../../serializers/posts.serializers';
import { getInterests } from '../../scripts/interests.scripts';
import removeInterestsToPostService from './removeInterestsToPost.service';
import { Repository } from 'typeorm';

const updatePostsService = async (
  postData: IPostRequest,
  postToUpdateId: string,
  requesterUserId: string,
): Promise<IPost> => {
  const postsRepository: Repository<Post> = AppDataSource.getRepository(Post);

  const postToUpdate: Post = await postsRepository
    .createQueryBuilder('Post')
    .innerJoinAndSelect('Post.user', 'User')
    .where('Post.id = :id', { id: postToUpdateId })
    .getOne();

  if (requesterUserId !== postToUpdate.user.id) {
    throw new AppError('You do not have permission', 403);
  }

  await removeInterestsToPostService(postToUpdate.id);

  const newPost: Post = await postsRepository.save({
    ...postToUpdate,
    ...postData,
  });

  const interestsArray: string[] = getInterests(newPost.description);

  await insertInterestsToPostService(interestsArray, newPost.id);

  return await postSerializar.validate(newPost, {
    stripUnknown: true,
  });
};

export default updatePostsService;
