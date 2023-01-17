import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Interest from './interests.entitie';
import Post from './posts.entities';

@Entity('interests_post')
class InterestsPost {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ManyToOne(() => Interest, (interest) => interest.interestsPost)
    interest: Interest;

  @ManyToOne(() => Post, (post) => post.interestsPost)
    post: Post;
}

export default InterestsPost;
