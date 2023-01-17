import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';

const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const deletedUser = await userRepository.findOneBy({
    id: userId,
  });

  await userRepository.softRemove(deletedUser);
  await userRepository.save(deletedUser);
};

export default deleteUserService;
