import AppDataSource from '../../data-source';
import Example from '../../entities/example.entities';
import { listMessageSerializer } from '../../serializers/example.serializes';

const listMessageService = async () => {
  const message = await AppDataSource.getRepository(Example).find();
  return await listMessageSerializer.validate(message, { stripUnknown: true });
};

export default listMessageService;
