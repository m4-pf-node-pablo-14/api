import { compareSync } from 'bcryptjs';
import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../../entities/user.entities';
import { IUserLogin } from '../../interfaces/users.interfaces';

const createLoginService = async (userData: IUserLogin) => {
  const user = await AppDataSource.getRepository(User).findOneBy({
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

export default createLoginService;
