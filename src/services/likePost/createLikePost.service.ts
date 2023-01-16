import AppDataSource from '../../data-source';
import Likes from '../../entities/likes.entities';
import Post from '../../entities/posts.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';

const createLikePostService = async (
  userId: string,
  postId: string,
): Promise<Likes> => {
  const postFind = await AppDataSource.getRepository(Post).findOne({
    where: {
      id: postId,
    },
  });

  if (!postFind) {
    throw new AppError('Post not found', 404);
  }

  const userfind = await AppDataSource.getRepository(User).findOne({
    where: {
      id: userId,
    },
  });

  if (!userfind) {
    throw new AppError('User not found', 404);
  }

  const likeRepository = AppDataSource.getRepository(Likes);

  const postalreadyliked = await likeRepository
    .createQueryBuilder('likes')
    .innerJoinAndSelect('likes.post', 'post')
    .innerJoinAndSelect('likes.user', 'user')
    .where('likes.post.id = :postId', { postId })
    .andWhere('likes.user.id = :userId', { userId })
    .getOne();

  if (postalreadyliked) {
    throw new AppError('Post already liked', 400);
  }

  const likePost = likeRepository.create({
    post: postFind,
    user: userfind,
  });

  await likeRepository.save(likePost);

  return likePost;
};

export default createLikePostService;
