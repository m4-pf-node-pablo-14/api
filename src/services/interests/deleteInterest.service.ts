import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entitie';
import AppError from '../../errors/AppError';

const deleteInterestService = async (interestId: string) => {
  const interestsRepository = AppDataSource.getRepository(Interest);

  const interestToDelete = await interestsRepository.findOneBy({
    id: interestId,
  });

  if (!interestToDelete) {
    throw new AppError('error not found', 404);
  }

  await interestsRepository.remove(interestToDelete);
};

export default deleteInterestService;
