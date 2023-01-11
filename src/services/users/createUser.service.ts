import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IUserRequest } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const createUserService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const isEmail = await userRepository.findOne({
    where: { email: userData.email },
    withDeleted: true,
  });
  if (isEmail) {
    throw new AppError('email already exists');
  }
  const isUsername = await userRepository.findOne({
    where: {
      username: userData.username,
    },
    withDeleted: true,
  });
  if (isUsername) {
    throw new AppError('username already exists');
  }
  const user = userRepository.create(userData);
  await userRepository.save(user);
  return await userResponserSerializer.validate(user, { stripUnknown: true });
};

export default createUserService;
