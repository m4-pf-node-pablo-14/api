interface IQueryParams {
  limit?: string;
  page?: string;
  lastPage?: boolean;
  all?: boolean;
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
  const isLastPage = queryParams.lastPage || false;
  const isAll = queryParams.all || false;

  if (isLastPage) {
    page = numberOfPages;
  }

  if (isAll) {
    page = 1;
    limit = entityCount;
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
