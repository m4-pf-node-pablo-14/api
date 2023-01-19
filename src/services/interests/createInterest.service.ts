import { IInterestRequets } from './../../interfaces/interests.interfaces';
import AppDataSource from '../../data-source';
import Interest from '../../entities/interests.entities';
import AppError from '../../errors/AppError';
import { ILike, Repository } from 'typeorm';

const createInterestService = async (
  interestData: IInterestRequets,
): Promise<Interest> => {
  const interestsRepository: Repository<Interest> =
    AppDataSource.getRepository(Interest);

  const interestCheck: Interest = await interestsRepository.findOneBy({
    name: ILike(interestData.name),
  });

  if (interestCheck) {
    throw new AppError('interest already exists', 409);
  }

  const interest: Interest = interestsRepository.create(interestData);

  await interestsRepository.save(interest);

  return interest;
};

export default createInterestService;
