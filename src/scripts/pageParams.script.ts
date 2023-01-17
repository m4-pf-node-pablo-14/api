import AppError from '../errors/AppError';

interface IQueryParams {
  limit?: string;
  page?: string;
  lastPage?: string;
  all?: string;
}

interface IReturned {
  page: number;
  limit: number;
  numberOfPages: number;
  isLastPage: boolean;
  isAll: boolean;
  offset: number;
}

const getPageParams = (
  queryParams: IQueryParams,
  entityCount: number,
): IReturned => {
  let page: number = Number(queryParams.page) || 1;
  let limit: number = Number(queryParams.limit) || 10;
  let numberOfPages = Math.ceil(entityCount / limit);
  const isLastPage = queryParams.lastPage === 'true';
  const isAll = queryParams.all === 'true';

  if (isLastPage) {
    page = numberOfPages;
    if (page === 0) {
      page = 1;
    }
  }

  if (isAll) {
    page = 1;
    limit = entityCount;
    numberOfPages = 1;
  }

  if (page > numberOfPages && numberOfPages > 0) {
    throw new AppError(`last page is ${numberOfPages}`, 404);
  }

  if (limit < 1) {
    throw new AppError('page can not be bellow 1', 400);
  }

  if (numberOfPages === 0) {
    numberOfPages = 1;
  }

  if (numberOfPages === 0) {
    numberOfPages = 1;
  }

  const offset = Number(page) * limit - limit || 0;

  const returnedObject = {
    page: page,
    limit: limit,
    numberOfPages: numberOfPages,
    isLastPage: isLastPage,
    isAll: isAll,
    offset: offset,
  };

  return returnedObject;
};

export { getPageParams };
