import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
<<<<<<< HEAD
  ManyToMany,
=======
>>>>>>> 9386cb420771fb5112603b20a6370c9ab2e10485
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entities';
import Likes from './likes.entities';
import Comment from './comments.entities';

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

<<<<<<< HEAD
  @OneToMany(() => Likes, (likes) => likes.post)
  @JoinTable()
  likes: Likes[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinTable()
  comments: Comment[];

=======
>>>>>>> 9386cb420771fb5112603b20a6370c9ab2e10485
  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
<<<<<<< HEAD
  users: User;
=======
    user: User;

  @OneToMany(() => Likes, (likes) => likes.post)
  @JoinTable()
    likes: Likes[];

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinTable()
    comments: Comment[];
>>>>>>> 9386cb420771fb5112603b20a6370c9ab2e10485
}

export default Post;
