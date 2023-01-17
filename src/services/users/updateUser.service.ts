import AppDataSource from '../../data-source';
import Address from '../../entities/address.entities';
import User from '../../entities/user.entities';
import AppError from '../../errors/AppError';
import { IUserUpdate } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const updateUserService = async (
  userData: IUserUpdate,
  userToUpdateId: string,
) => {
  const userRepository = AppDataSource.getRepository(User);
  const addressRepository = AppDataSource.getRepository(Address);


  const userFind = await userRepository.findOne({
    where: { id: userToUpdateId },
    relations: { address: true },
  });

  if (!userFind) {
    throw new AppError('User not found', 404);
  }

  const addressFind = await addressRepository.findOneBy({
    id: userFind.address.id,
  });

  const address = await addressRepository.save({
    ...addressFind,
    ...userData.address,
  });

  delete userData.address;

  const user = await userRepository.save({
    ...userFind,
    ...userData,
    address,
  });

  return await userResponserSerializer.validate(user, { stripUnknown: true });
};

export default updateUserService;
