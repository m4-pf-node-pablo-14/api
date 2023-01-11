import { getRounds, hashSync } from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import Comment from './comments.entities';
import CommentToLikes from './commentToLikes.entities';
import Follow from './follow.entities';
import Likes from './likes.entities';
import Post from './posts.entities';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ type: 'text', nullable: true })
  interest_one?: string;

  @Column({ type: 'text', nullable: true })
  interest_two?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.following)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followers)
  followers: Follow[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => CommentToLikes, (likes) => likes.comment)
  commentLikes: CommentToLikes[];

  @OneToMany(() => Post, (post) => post.users)
  posts: Post[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    const numberRounds = getRounds(this.password);
    if (!numberRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
