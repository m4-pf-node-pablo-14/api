import { setUserInterestsService } from './../users/setUserInterests.service';
import AppDataSource from '../../data-source';
import Likes from '../../entities/likes.entities';
import AppError from '../../errors/AppError';

const deslikePostService = async (
  userId: string,
  likePostID: string,
): Promise<void> => {
  const likeRepository = AppDataSource.getRepository(Likes);

  const likePost = await likeRepository.findOne({
    where: {
      id: likePostID,
      user: {
        id: userId,
      },
    },
  });

  if (!likePost) {
    throw new AppError('post not liked ', 404);
  }

  await likeRepository.remove(likePost);

  await setUserInterestsService(userId)
};

export default deslikePostService;
