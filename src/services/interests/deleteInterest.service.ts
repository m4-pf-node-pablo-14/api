import { Repository } from 'typeorm';
import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entities';

const deleteInterestService = async (interestId: string): Promise<void> => {
  const interestsRepository: Repository<Interest> =
    AppDataSource.getRepository(Interest);

  const interestToDelete: Interest = await interestsRepository.findOneBy({
    id: interestId,
  });

  await interestsRepository.remove(interestToDelete);
};

export default deleteInterestService;
