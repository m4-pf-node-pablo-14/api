/* import AppDataSource from '../../../data-source';
import ExampleUser from '../../../entities/exampleUser.entities';
import { IUserRequest } from '../../../interfaces/examples.interfaces';
import { userResponserSerializer } from '../../../serializers/exampleUser.serializes';

const createUserService = async (userData: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(ExampleUser);
  const user = userRepository.create(userData);
  await userRepository.save(user);
  return await userResponserSerializer.validate(user, { stripUnknown: true });
};

export default createUserService;
 */