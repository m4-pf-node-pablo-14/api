import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';

const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: userId,
  });
  await userRepository.softRemove(user);
  await userRepository.save(user);
};

export default deleteUserService;
