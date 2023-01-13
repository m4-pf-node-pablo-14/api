import AppDataSource from "../../data-source";
import Follow from "../../entities/follow.entities";
import AppError from "../../errors/AppError";
import { followRequest } from "../../interfaces/follow.interfaces";

const deleteFollowService = async (data: followRequest): Promise<void> => {
  const followRepository = AppDataSource.getRepository(Follow);

  const find = await followRepository.findOne({
    where: { followers: { id: data.followers } },
  });

  if (!find) {
    throw new AppError("User not found", 404);
  }

  await followRepository.remove(find);
};

export default deleteFollowService;
