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

  @ManyToOne(() => User, (user) => user.commentLikes)
    user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes)
    comment: Comment;
}

export default CommentToLikes;
