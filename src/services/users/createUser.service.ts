import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Address from '../../entities/address.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IUserRequest, IUserResponse } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const createUserService = async (
  userData: IUserRequest,
): Promise<IUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const userVerify: User[] = await userRepository.find({
    where: [{ email: userData.email }, { username: userData.username }],
    withDeleted: true,
  });

  if (userVerify[0]) {
    throw new AppError('user already exists', 409);
  }

  const address: Address = addressRepository.create(userData.address);
  await addressRepository.save(address);

  delete userData.address;

  const user: User = userRepository.create({ ...userData, address });
  await userRepository.save(user);

  return await userResponserSerializer.validate(user, {
    stripUnknown: true,
  });
};

export default createUserService;
