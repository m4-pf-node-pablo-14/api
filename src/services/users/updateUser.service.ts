import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import { IUserUpdate } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const updateUserService = async (userData: IUserUpdate, userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userFind = await userRepository.findOneBy({ id: userId });
  const user = await userRepository.save({ ...userFind, ...userData });
  return await userResponserSerializer.validate(user, { stripUnknown: true });
};

export default updateUserService;
