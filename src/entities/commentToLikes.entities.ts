import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comment from './comments.entities';
import User from './user.entities';

@Entity('comment_likes')
class CommentToLikes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.commentLikes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comment: Comment;
}

export default CommentToLikes;
