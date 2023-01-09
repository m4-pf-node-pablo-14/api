import AppDataSource from '../../data-source';
import Example from '../../entities/example.entities';
import { IMessageUpdateRequest } from '../../interfaces/examples.interfaces';
import { messageResponserSerializer } from '../../serializers/example.serializes';

const updateMessageService = async (
  messageId: string,
  messageData: IMessageUpdateRequest,
) => {
  const exampleRepository = AppDataSource.getRepository(Example);
  const messageFind = await exampleRepository.findOneBy({ id: messageId });
  const message = await exampleRepository.save({
    ...messageFind,
    ...messageData,
  });
  return messageResponserSerializer.validate(message, { stripUnknown: true });
};

export default updateMessageService;
