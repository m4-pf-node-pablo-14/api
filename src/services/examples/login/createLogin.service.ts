/* import { compareSync } from 'bcryptjs';
import AppDataSource from '../../../data-source';
import ExampleUser from '../../../entities/exampleUser.entities';
import AppError from '../../../errors/AppError';
import { IUserRequest } from '../../../interfaces/examples.interfaces';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const createLoginService = async (userData: IUserRequest) => {
  const user = await AppDataSource.getRepository(ExampleUser).findOneBy({
    email: userData.email,
  });
  if (!user) {
    throw new AppError('wrong email or password');
  }
  const passwordMatch = compareSync(userData.password, user.password);
  if (!passwordMatch) {
    throw new AppError('wrong email or password');
  }
  const token = jwt.sign({}, process.env.SECRET_KEY, {
    expiresIn: '24h',
    subject: user.id,
  });
  return { token };
};

export default createLoginService; */
