/* import AppDataSource from '../../../data-source';
import ExampleUser from '../../../entities/exampleUser.entities';
import { IMessageRequest } from '../../../interfaces/examples.interfaces';
import { messageResponserSerializer } from '../../../serializers/exampleMessage.serializes';
import ExampleMessage from '../../../entities/exampleMessage.entities';

const createMessageService = async (
  messageData: IMessageRequest,
  userId: string,
) => {
  const user = await AppDataSource.getRepository(ExampleUser).findOneBy({
    id: userId,
  });
  const exampleRepository = AppDataSource.getRepository(ExampleMessage);
  const message = exampleRepository.create({ ...messageData, user: user });
  await exampleRepository.save(message);
  return await messageResponserSerializer.validate(message, {
    stripUnknown: true,
  });
};

export default createMessageService;
 */