import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';

const deleteUserService = async (userId: string, req: any): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const deletedUser = await userRepository.findOneBy({
    id: userId,
  });
  
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: req.user.id,
  });
  const deleted = {
    ...deletedUser,
    status: 'Banned'
  }
  
  if (user.isAdm === true) {
    await userRepository.softRemove(deleted);
    await userRepository.save(deleted);
  }

  await userRepository.softRemove(deletedUser);
  await userRepository.save(deletedUser);
};

export default deleteUserService;
