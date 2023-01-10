import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Post from './post.entities.ts';
import User from './user.entities.ts';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 160 })
    text: string;

  @ManyToOne(() => Post, (post) => post.comments)
    post: Post;

  @ManyToOne(() => User, (user) => user.comments)
    user: User;
}

export default Comment;
