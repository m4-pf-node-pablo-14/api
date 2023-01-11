import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import CommentToLikes from './commentToLikes.entities';
import Post from './posts.entities';

import User from './user.entities';

@Entity('comments')
class Comment {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'text' })
    text: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
    post: Post;

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
    user: User;

  @OneToMany(() => CommentToLikes, (like) => like.comment)
    likes: CommentToLikes[];
}

export default Comment;
