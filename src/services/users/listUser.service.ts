import AppDataSource from '../../data-source';
import User from '../../entities/user.entities';
import { listUsersSerializer } from '../../serializers/user.serializes';

const listUsersService = async () => {
  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder('users')
    .innerJoinAndSelect('users.address', 'address')
    .select(['users', 'address'])
    .getMany();
  return await listUsersSerializer.validate(user, { stripUnknown: true });
};

export default listUsersService;
