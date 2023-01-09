import AppDataSource from '../../data-source';
import Example from '../../entities/example.entities';
import { IMessageRequest } from '../../interfaces/examples.interfaces';
import { messageResponserSerializer } from '../../serializers/example.serializes';

const createMessageService = async (messageData: IMessageRequest) => {
  const exampleRepository = AppDataSource.getRepository(Example);
  const message = exampleRepository.create(messageData);
  await exampleRepository.save(message);
  return await messageResponserSerializer.validate(message, {
    stripUnknown: true,
  });
};

export default createMessageService;
