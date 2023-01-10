import AppDataSource from '../../../data-source';
import ExampleMessage from '../../../entities/exampleMessage.entities';

const deleteMessageService = async (messageId: string) => {
  const exampleRepository = AppDataSource.getRepository(ExampleMessage);
  const message = await exampleRepository.findOneBy({ id: messageId });
  await exampleRepository.softRemove(message);
  await exampleRepository.save(message);
  return {};
};

export default deleteMessageService;
