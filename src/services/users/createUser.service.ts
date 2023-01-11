import AppDataSource from '../../data-source';
import Address from '../../entities/address.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IUserRequest } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const createUserService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address)

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

  const address = addressRepository.create(userData.address)
  await addressRepository.save(address)

 delete userData.address

  const user = userRepository.create({...userData, address});
  await userRepository.save(user);
  console.log(user)
  return user
};

export default createUserService;

/* await userResponserSerializer.validate(user, { stripUnknown: true }); */ 
