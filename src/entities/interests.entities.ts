import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import InterestsPost from './interestsPost.entities';

@Entity('interests')
class Interest {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ length: 60 })
    name: string;

  @OneToMany(() => InterestsPost, (interestPost) => interestPost.interest)
  @JoinTable()
    interestsPost: InterestsPost[];
}

export default Interest;
