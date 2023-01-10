import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
class Post {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'text', length: 200 })
    img: string;

  @Column({ type: 'text', length: 300 })
    description: string;

  @ManyToMany(() => User, (User) => User.posts)
    user: User;
}

export default Post;
