import Interest from '../entities/interests.entities';

interface IRowsOfCounts {
  postsCount: string;
  interests_id: string;
}

interface IMainInterests {
  mainInterestName: any;
  mainInterestCount: number | unknown;
}

interface IRecentInterests {
  recentInterestName: any;
  recentInterestCount: number | unknown;
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

const countInterests = (latestLikes) => {
  let count = {};
  let countRecent = {};

  latestLikes.forEach((like, index) => {
    like.post.interestsPost.forEach((interestPost) => {
      count[interestPost.interest.name] =
        (count[interestPost.interest.name] || 0) + 1;
    });

    if (index < 5) {
      like.post.interestsPost.forEach((interestPost) => {
        countRecent[interestPost.interest.name] =
          (countRecent[interestPost.interest.name] || 0) + 1;
      });
    }
  });

  const mainInterest: IMainInterests = {
    mainInterestName: null,
    mainInterestCount: 0,
  };

  const recentInterest: IRecentInterests = {
    recentInterestName: null,
    recentInterestCount: 0,
  };

  Object.entries(count).forEach(([key, value]) => {
    if (value > mainInterest.mainInterestCount) {
      mainInterest.mainInterestCount = value;
      mainInterest.mainInterestName = key;
    }
  });

  Object.entries(countRecent).forEach(([key, value]) => {
    if (value > recentInterest.recentInterestCount) {
      recentInterest.recentInterestCount = value;
      recentInterest.recentInterestName = key;
    }
  });

  const interests = {
    mainInterest,
    recentInterest,
  };

  return interests;
};

export { mergeInterestsAndRows, getInterests, countInterests };
