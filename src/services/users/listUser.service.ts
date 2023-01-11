import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import { listUserSerializer } from '../../serializers/user.serializes';

const listUserService = async () => {
  const user = await AppDataSource.getRepository(User).createQueryBuilder("users").innerJoinAndSelect("users.address", "address").select(["users", "address"]).getMany();
  return await listUserSerializer.validate(user, { stripUnknown: true });
};

export default listUserService;
