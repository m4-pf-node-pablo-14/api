import AppDataSource from "../../data-source";
import User from "../../entities/user.entities";
import AppError from "../../errors/AppError";
import { IUserResponse } from "../../interfaces/users.interfaces";
import { userResponserSerializer } from "../../serializers/user.serializes";

const dataProfileUserService = async (userId: string): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const find = await userRepository.findOne({
    where: { id: userId },
    relations: { address: true },
  });
 
  if (!find) {
    throw new AppError("User not found");
  }
  const validatedUser = await userResponserSerializer.validate(find, {
    stripUnknown: true,
  });

  return validatedUser
};

export default dataProfileUserService;
