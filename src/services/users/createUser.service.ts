import AppDataSource from '../../data-source';
import Address from '../../entities/address.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IUserRequest } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const createUserService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);

  const userVerify = await userRepository.find({
    where: [{ email: userData.email }, { username: userData.username }],
    withDeleted: true,
  });

  if (userVerify[0]) {
    throw new AppError('user already exists');
  }

  const address = addressRepository.create(userData.address);
  await addressRepository.save(address);

  delete userData.address;

  const user = userRepository.create({ ...userData, address });
  await userRepository.save(user);

  const createdUser = await userResponserSerializer.validate(user, {
    stripUnknown: true,
  });

  return createdUser;
};

export default createUserService;
