import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entities';

@Entity('follow')
class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.following, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  following: User;

  @ManyToOne(() => User, (user) => user.followers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  followers: User;
}

export default Follow;
