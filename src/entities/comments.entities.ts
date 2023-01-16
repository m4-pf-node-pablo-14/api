import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entities';
import Post from './posts.entities';
import CommentToLikes from './commentToLikes.entities';

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

  @ManyToOne(() => User, (user) => user.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
    user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: 'CASCADE',
  })
    post: Post;

  @OneToMany(() => CommentToLikes, (like) => like.comment)
    likes: CommentToLikes[];
}

export default Comment;
