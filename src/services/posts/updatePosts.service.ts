import { IPost } from './../../interfaces/posts.interfaces';
import AppDataSource from '../../data-source';
import Post from '../../entities/posts.entities';
import AppError from '../../errors/AppError';
import { IPostRequest } from '../../interfaces/posts.interfaces';
import { postSerializar } from '../../serializers/posts.serializers';

const updatePostsService = async (
  postData: IPostRequest,
  postToUpdateId: string,
  requesterUserId: string,
): Promise<IPost> => {
  const postsRepository = AppDataSource.getRepository(Post);

  const postToUpdate = await postsRepository
    .createQueryBuilder('Post')
    .innerJoinAndSelect('Post.user', 'User')
    .where('Post.id = :id', { id: postToUpdateId })
    .getOne();

  if (requesterUserId !== postToUpdate.user.id) {
    throw new AppError('You don\'t have permission', 401);
  }

  if (!postToUpdate) {
    throw new AppError('Post not found', 404);
  }

  const newPost = await postsRepository.save({ ...postToUpdate, ...postData });

  const validatedPost = await postSerializar.validate(newPost, {
    stripUnknown: true,
  });

  return validatedPost;
};

export default updatePostsService;
