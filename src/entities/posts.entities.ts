import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entities';
import Likes from './likes.entities';
import Comment from './comments.entities';
import InterestsPost from './interestsPost.entities';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'text', nullable: true })
    img: string;

  @Column({ type: 'text', nullable: true })
    description: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
    user: User;

  @OneToMany(() => Likes, (likes) => likes.post)
  @JoinTable()
    likes: Likes[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinTable()
    comments: Comment[];

  @OneToMany(() => InterestsPost, (interestPost) => interestPost.post)
  @JoinTable()
    interestsPost: InterestsPost[];
}

export default Post;
