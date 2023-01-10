import AppDataSource from '../../../data-source';
import ExampleUser from '../../../entities/exampleUser.entities';
import { listUserSerializer } from '../../../serializers/exampleUser.serializes';

const listUserService = async () => {
  const user = await AppDataSource.getRepository(ExampleUser).find();
  return await listUserSerializer.validate(user, { stripUnknown: true });
};

export default listUserService;
