import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CommentToLikes from './commentToLikes.entities';
import Post from './post.entities.ts';
import User from './user.entities';

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

  @OneToMany(() => CommentToLikes, (like) => like.comment)
    likes: CommentToLikes[];
}

export default Comment;
