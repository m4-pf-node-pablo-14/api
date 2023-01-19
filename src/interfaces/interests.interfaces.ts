import InterestsPost from '../entities/interestsPost.entities';

export interface IInterestRequets {
  name: string;
}

export interface IInterst extends IInterestRequets {
  relatedPosts: number;
  id: string;
  interestsPost: InterestsPost[];
}
