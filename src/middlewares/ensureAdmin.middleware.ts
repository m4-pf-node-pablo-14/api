import { NextFunction, Request, Response } from "express"
import AppDataSource from "../data-source"
import User from "../entities/user.entities"
import AppError from "../errors/AppError"

export const ensureAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({ id: req.user.id })

  if (user.isAdmin === false) {

    throw new AppError('only admins', 403)
  }

  return next()
}