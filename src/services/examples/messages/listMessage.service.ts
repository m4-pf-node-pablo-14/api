import AppDataSource from '../../../data-source';
import ExampleMessage from '../../../entities/exampleMessage.entities';
import { listMessageSerializer } from '../../../serializers/exampleMessage.serializes';

const listMessageService = async () => {
  const message = await AppDataSource.getRepository(ExampleMessage).find();
  return await listMessageSerializer.validate(message, { stripUnknown: true });
};

export default listMessageService;
