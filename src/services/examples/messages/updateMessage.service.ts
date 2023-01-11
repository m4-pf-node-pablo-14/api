/* import AppDataSource from '../../../data-source';
import ExampleMessage from '../../../entities/exampleMessage.entities';
import { IMessageUpdateRequest } from '../../../interfaces/examples.interfaces';
import { messageResponserSerializer } from '../../../serializers/exampleMessage.serializes';

const updateMessageService = async (
  messageId: string,
  messageData: IMessageUpdateRequest,
) => {
  const exampleRepository = AppDataSource.getRepository(ExampleMessage);
  const messageFind = await exampleRepository.findOneBy({ id: messageId });
  const message = await exampleRepository.save({
    ...messageFind,
    ...messageData,
  });
  return messageResponserSerializer.validate(message, { stripUnknown: true });
};

export default updateMessageService;
 */