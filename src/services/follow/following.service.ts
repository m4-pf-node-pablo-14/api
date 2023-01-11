import AppDataSource from "../../data-source";
import Follow from "../../entities/follow.entities";
import AppError from "../../errors/AppError";

const followService = async (data): Promise<void> => {
  const followRepository = AppDataSource.getRepository(Follow);

  const find = await followRepository
    .createQueryBuilder("follow")
    .where("follow.following = :id", { id: data.following })
    .where("follow.followers = :id", { id: data.followers })
    .getOne();

  if (find) {
    throw new AppError("You already follow this user", 404);
  }

  const newFollow = await followRepository.create(data);

  await followRepository.save(newFollow);
};

export default followService;
