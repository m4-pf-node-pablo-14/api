import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Comment from './comments.entities';
import Likes from './likes.entities';
import User from './user.entities';

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
    updateAt: Date;

  @OneToMany(() => Likes, (likes) => likes.post)
  @JoinTable()
    likes: Likes[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinTable()
    comments: Comment[];

  @ManyToMany(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
    users: User[];
}

export default Post;
