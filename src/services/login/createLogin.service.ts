import { compareSync } from 'bcryptjs';
import AppDataSource from '../../data-source';
import AppError from '../../errors/AppError';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../../entities/user.entities';
import { IUserLogin } from '../../interfaces/users.interfaces';

const createLoginService = async (
  userData: IUserLogin,
): Promise<{ token: string }> => {
  const user = await AppDataSource.getRepository(User).findOneBy({
    email: userData.email,
  });
  if (!user) {
    throw new AppError('wrong email or password', 404);
  }
  const passwordMatch = compareSync(userData.password, user.password);
  if (!passwordMatch) {
    throw new AppError('wrong email or password', 404);
  }
  const token = jwt.sign({}, process.env.SECRET_KEY, {
    expiresIn: '24h',
    subject: user.id,
  });
  return { token };
};

export default createLoginService;
