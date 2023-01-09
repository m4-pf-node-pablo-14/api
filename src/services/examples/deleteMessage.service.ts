import AppDataSource from '../../data-source';
import Example from '../../entities/example.entities';

const deleteMessageService = async (messageId: string) => {
  const exampleRepository = AppDataSource.getRepository(Example);
  const message = await exampleRepository.findOneBy({ id: messageId });
  await exampleRepository.softRemove(message);
  await exampleRepository.save(message);
  return {};
};

export default deleteMessageService;
