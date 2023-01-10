import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entities.ts';

@Entity('follow')
class Follow {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @ManyToOne(() => User, (user) => user.following)
    following: User;

  @ManyToOne(() => User, (user) => user.followers)
    followers: User;
}

export default Follow;
