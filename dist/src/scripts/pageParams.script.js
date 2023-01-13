"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageParams = void 0;
const getPageParams = (queryParams, entityCount) => {
    let page = Number(queryParams.page) || 1;
    let limit = Number(queryParams.limit) || 10;
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
exports.getPageParams = getPageParams;
//# sourceMappingURL=pageParams.script.js.map