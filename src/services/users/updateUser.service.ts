import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IUserUpdate } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const updateUserService = async (userData: IUserUpdate, userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userFind = await userRepository.findOne({
    where: { id: userId },
    relations: { address: true },
  });

  if (!userFind) {
    throw new AppError('User not found', 404);
  }
  const user = await userRepository.save({ ...userFind, ...userData });
  return await userResponserSerializer.validate(user, { stripUnknown: true });
};

export default updateUserService;
