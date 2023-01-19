import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Address from '../../entities/address.entities';
import User from '../../entities/user.entities';
import { IUserResponse, IUserUpdate } from '../../interfaces/users.interfaces';
import { userResponserSerializer } from '../../serializers/user.serializes';

const updateUserService = async (
  userData: IUserUpdate,
  userToUpdateId: string,
): Promise<IUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const userFind: User = await userRepository.findOne({
    where: { id: userToUpdateId },
    relations: { address: true },
  });

  const addressFind: Address = await addressRepository.findOneBy({
    id: userFind.address.id,
  });

  const address: Address = await addressRepository.save({
    ...addressFind,
    ...userData.address,
  });

  delete userData.address;

  const user: User = await userRepository.save({
    ...userFind,
    ...userData,
    address,
  });

  return await userResponserSerializer.validate(user, { stripUnknown: true });
};

export default updateUserService;
