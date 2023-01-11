import AppDataSource from '../../data-source'
import AppError from '../../errors/AppError'

export const listUserCommentsService = async (tokenId: string, userId: string) => {

  const commentsRepo = AppDataSource.getRepository(Comment)
  const commentsQB = commentsRepo.createQueryBuilder('comments')

  if (userId !== tokenId) {

    throw new AppError('only your comments', 403)
  }

  const comments = await commentsQB
    .where('user = :userId', { userId })
    .getMany()

  return comments
}
