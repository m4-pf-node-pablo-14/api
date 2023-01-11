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
<<<<<<< HEAD
=======
  OneToOne,
  JoinColumn,
>>>>>>> 9386cb420771fb5112603b20a6370c9ab2e10485
} from 'typeorm';
import Address from './address.entities';
import Follow from './follow.entities';
import Post from './posts.entities';
import Likes from './likes.entities';
import Comment from './comments.entities';
import CommentToLikes from './commentToLikes.entities';

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

  @Column({ type: 'text', nullable: true })
    bio?: string;

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

  @OneToOne(() => Address)
  @JoinColumn()
    address: Address;

  @OneToMany(() => Follow, (follow) => follow.following)
    following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followers)
    followers: Follow[];

  @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

  @OneToMany(() => Likes, (likes) => likes.user)
    likes: Likes[];

  @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

  @OneToMany(() => CommentToLikes, (likes) => likes.comment)
<<<<<<< HEAD
  commentLikes: CommentToLikes[];

  @OneToMany(() => Post, (post) => post.users)
  posts: Post[];
=======
    commentLikes: CommentToLikes[];
>>>>>>> 9386cb420771fb5112603b20a6370c9ab2e10485

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
