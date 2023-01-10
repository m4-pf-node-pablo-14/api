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

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 60 })
    name: string;

  @Column({ length: 60 })
    last_name: string;

  @Column({ length: 60 })
    password: string;

  @Column({ length: 60, unique: true })
    email: string;

  @Column({ length: 60, unique: true })
    username: string;

  @Column({ length: 200 })
    bio: string;

  @Column()
    interest_one: string;

  @Column()
    interest_two: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updateAt: Date;

  @DeleteDateColumn()
    deleteAt: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

  @OneToMany(() => Follow, (follow) => follow.following)
    following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followers)
    followers: Follow[];

  @OneToMany(() => CommentToLikes, (likes) => likes.comment)
    commentLikes: CommentToLikes[];

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
