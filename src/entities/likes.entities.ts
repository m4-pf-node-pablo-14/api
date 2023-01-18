import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import Post from './posts.entities';
import User from './user.entities';

@Entity('likes')
class Likes {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @CreateDateColumn()
    createdAt: Date;

  @ManyToOne(() => User, (user) => user.likes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
    user: User;

  @ManyToOne(() => Post, (post) => post.likes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
    post: Post;
}
 
export default Likes;
