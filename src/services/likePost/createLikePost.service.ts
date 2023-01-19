import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';
import { responseCreateLikePostSerializer } from '../../serializers/posts.serializers';
import { IResponseCreateLike } from '../../interfaces/posts.interfaces';
import Post from '../../entities/posts.entities';
import Likes from '../../entities/likes.entities';
import User from '../../entities/user.entities';
import setUserInterestsService from '../users/setUserInterests.service';
import { Repository } from 'typeorm';

const createLikePostService = async (
  userId: string,
  postId: string,
): Promise<IResponseCreateLike> => {
  const postRepository: Repository<Post> = AppDataSource.getRepository(Post);

  const likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  const postFind: Post = await postRepository.findOne({
    where: {
      id: postId,
    },
  });

  const userfind: User = await AppDataSource.getRepository(User).findOne({
    where: {
      id: userId,
    },
  });

  const postalreadyliked: Likes = await likeRepository
    .createQueryBuilder('likes')
    .innerJoinAndSelect('likes.post', 'post')
    .innerJoinAndSelect('likes.user', 'user')
    .where('likes.post.id = :postId', { postId })
    .andWhere('likes.user.id = :userId', { userId })
    .getOne();

  if (postalreadyliked) {
    throw new AppError('Post already liked', 403);
  }

  const likePost: Likes = likeRepository.create({
    post: postFind,
    user: userfind,
  });

  await likeRepository.save(likePost);

  await setUserInterestsService(userId);

  return await responseCreateLikePostSerializer.validate(likePost, {
    stripUnknown: true,
  });
};

export default createLikePostService;
