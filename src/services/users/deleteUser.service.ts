import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';

const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const deletedUser: User = await userRepository.findOneBy({
    id: userId,
  });

  await userRepository.softRemove(deletedUser);
  await userRepository.save(deletedUser);
};

export default deleteUserService;
