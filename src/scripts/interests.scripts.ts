import Interest from '../entities/interests.entitie';

interface IRowsOfCounts {
  postsCount: string;
  interests_id: string;
}

const mergeInterestsAndRows = (
  interests: Interest[],
  rowsOfCounts: IRowsOfCounts[],
) => {
  const newInterests = [];

  interests.forEach((interest) => {
    rowsOfCounts.forEach((row) => {
      if (interest.id === row.interests_id) {
        const newInterest = {
          ...interest,
          relatedPosts: Number(row.postsCount),
        };

        newInterests.push(newInterest);
      }
    });
  });

  return newInterests;
};

const getInterests = (text: string) => {
  const interestsArray = [];

  const splitedText = text.split('#');

  splitedText.forEach((elem, index) => {
    if (index > 0) {
      const interest = elem.split(' ')[0];
      interestsArray.push(interest);
    }
  });
  return interestsArray;
};

export { mergeInterestsAndRows, getInterests };
