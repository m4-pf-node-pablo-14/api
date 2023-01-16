import { IInterestRequets } from './../../interfaces/interests.interfaces';
import AppDataSource from "../../data-source"
import Interest from "../../entities/interests.entitie"
import AppError from '../../errors/AppError';

export const createInterestService = async (interestData: IInterestRequets): Promise<Interest> => {

    const interestsRepository = AppDataSource.getRepository(Interest)

    const interestCheck = await interestsRepository.findOneBy({
        name: interestData.name
    })

    if(interestCheck){
        throw new AppError('interest already exists', 400)
    }

    const interest = interestsRepository.create(interestData)

    await interestsRepository.save(interest)

    return interest
}