import AppDataSource from "../../data-source";
import Follow from "../../entities/follow.entities";
import AppError from "../../errors/AppError";

const deleteFollowService = async (data): Promise<void> => {
  const followRepository = AppDataSource.getRepository(Follow);

  const find = await followRepository
    .createQueryBuilder("follow")
    .where("follow.followers = :id", { id: data.followers })
    .getOne();

  if (!find) {
    throw new AppError("User not found", 404);
  }

  await followRepository.delete(data);
};

export default deleteFollowService;
