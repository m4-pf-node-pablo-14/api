import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Likes from '../../entities/likes.entities';
import AppError from '../../errors/AppError';
import setUserInterestsService from '../users/setUserInterests.service';

const deslikePostService = async (
  userId: string,
  likePostID: string,
): Promise<void> => {
  const likeRepository: Repository<Likes> = AppDataSource.getRepository(Likes);

  const likePost: Likes = await likeRepository.findOne({
    where: {
      id: likePostID,
      user: {
        id: userId,
      },
    },
  });

  if (!likePost) {
    throw new AppError('it is not allowed to dislike the post', 403);
  }

  await likeRepository.remove(likePost);

  await setUserInterestsService(userId);
};

export default deslikePostService;
